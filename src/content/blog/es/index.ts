import type { BlogPost } from "@/lib/blog";
import { post as seoBasicsGuide } from "./seo-basics-guide";
import { post as seoToolsGuide } from "./seo-tools-guide";
import { post as backlinksGuide } from "./backlinks-guide";
import { post as keywordsSeo } from "./keywords-seo";
import { post as seoToolsFree } from "./seo-tools-free";
import { post as seoToolsAi } from "./seo-tools-ai";
import { post as seoAuditFree } from "./seo-audit-free";
import { post as backlinksFree } from "./backlinks-free";

export const posts: BlogPost[] = [
  seoBasicsGuide,
  seoToolsGuide,
  backlinksGuide,
  keywordsSeo,
  seoToolsFree,
  seoToolsAi,
  seoAuditFree,
  backlinksFree,
];
