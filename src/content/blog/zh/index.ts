import type { BlogPost } from "@/lib/blog";
import { post as seoBasicsGuide } from "./seo-basics-guide";
import { post as keywordResearchGuide } from "./keyword-research-guide";
import { post as backlinksGuide } from "./backlinks-guide";
import { post as seoOptimization } from "./seo-optimization";
import { post as seoCopywriting } from "./seo-copywriting";
import { post as seoKeywordAnalysis } from "./seo-keyword-analysis";
import { post as backlinkCheck } from "./backlink-check";

export const posts: BlogPost[] = [
  seoBasicsGuide,
  keywordResearchGuide,
  backlinksGuide,
  seoOptimization,
  seoCopywriting,
  seoKeywordAnalysis,
  backlinkCheck,
];
