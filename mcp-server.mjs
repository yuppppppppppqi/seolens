#!/usr/bin/env node

/**
 * SEOLens MCP Server
 *
 * Exposes keyword research as an MCP tool.
 * Connects to the running Next.js server to fetch data.
 *
 * Usage:
 *   node mcp-server.mjs
 *
 * Claude Code config (~/.claude/claude_desktop_config.json):
 * {
 *   "mcpServers": {
 *     "seolens": {
 *       "command": "node",
 *       "args": ["/path/to/seolens/mcp-server.mjs"]
 *     }
 *   }
 * }
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const BASE_URL = process.env.SEOLENS_URL || "http://localhost:3008";

const server = new Server(
  { name: "seolens", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "keyword_research",
      description:
        "Research keywords to get search volume, keyword difficulty, CPC, competition, and related keyword suggestions. Supports up to 10 keywords at once.",
      inputSchema: {
        type: "object",
        properties: {
          keywords: {
            type: "array",
            items: { type: "string" },
            description: "Keywords to research (1-10)",
          },
          countryCode: {
            type: "string",
            description:
              "Country code (US, JP, GB, DE, FR, CA, AU, BR, IN, KR, MX, ES, IT, NL, SE, TW, TH, VN, ID, PH). Default: US",
            default: "US",
          },
          languageCode: {
            type: "string",
            description:
              "Language code (en, ja, de, fr, es, pt, it, nl, ko, zh, th, vi, id, sv). Default: en",
            default: "en",
          },
        },
        required: ["keywords"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "keyword_research") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const { keywords, countryCode = "US", languageCode = "en" } =
    request.params.arguments;

  if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
    return {
      content: [
        { type: "text", text: "Error: keywords array is required" },
      ],
    };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/research`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords, countryCode, languageCode }),
    });

    if (!res.ok) {
      const err = await res.text();
      return {
        content: [
          { type: "text", text: `API Error (${res.status}): ${err}` },
        ],
      };
    }

    const data = await res.json();

    // Format results as readable text
    let output = "";
    for (const result of data.results) {
      output += `\n## "${result.keyword}" (${countryCode}/${languageCode})\n`;
      output += `- Volume: ${result.metrics?.avgMonthlySearches?.toLocaleString() ?? "N/A"}\n`;
      output += `- Keyword Difficulty: ${result.difficulty ?? "N/A"}\n`;
      output += `- CPC: ${result.metrics?.cpcLow != null ? `$${result.metrics.cpcLow.toFixed(2)}` : "N/A"}`;
      if (result.metrics?.cpcHigh != null) {
        output += ` - $${result.metrics.cpcHigh.toFixed(2)}`;
      }
      output += `\n`;
      output += `- Competition: ${result.metrics?.competition ?? "N/A"}\n`;

      if (result.suggestions.length > 0) {
        output += `\n### Top Suggestions:\n`;
        output += `| Keyword | Volume | KD | CPC | Competition |\n`;
        output += `|---------|--------|-----|-----|-------------|\n`;
        for (const s of result.suggestions.slice(0, 20)) {
          const vol = s.avgMonthlySearches?.toLocaleString() ?? "-";
          const kd = s.difficulty ?? "-";
          const cpc = s.cpcLow != null ? `$${s.cpcLow.toFixed(2)}` : "-";
          const comp = s.competition ?? "-";
          output += `| ${s.keyword} | ${vol} | ${kd} | ${cpc} | ${comp} |\n`;
        }
      }
      output += `\n`;
    }

    return {
      content: [{ type: "text", text: output.trim() }],
    };
  } catch (err) {
    return {
      content: [
        {
          type: "text",
          text: `Error connecting to SEOLens server at ${BASE_URL}. Make sure it's running (npm run dev -- -p 3008). Error: ${err.message}`,
        },
      ],
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
