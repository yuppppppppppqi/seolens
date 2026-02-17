import crypto from "crypto";
import { getSupabase } from "./supabase";

export interface ApiKeyRecord {
  id: number;
  key_prefix: string;
  name: string;
  daily_limit: number;
  is_active: boolean;
}

export interface AuthResult {
  valid: true;
  apiKey: ApiKeyRecord;
  usage: number;
}

export interface AuthError {
  valid: false;
  status: number;
  error: string;
}

// --- Key generation ---

export function generateApiKey(): {
  raw: string;
  hash: string;
  prefix: string;
} {
  const randomPart = crypto.randomBytes(16).toString("hex");
  const raw = `sk_live_${randomPart}`;
  const hash = hashKey(raw);
  const prefix = raw.slice(0, 16); // "sk_live_a1b2c3d4"
  return { raw, hash, prefix };
}

export function hashKey(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

// --- Validation ---

export async function validateApiKey(
  request: Request
): Promise<AuthResult | AuthError> {
  const authHeader = request.headers.get("authorization");
  const xApiKey = request.headers.get("x-api-key");

  let rawKey: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    rawKey = authHeader.slice(7).trim();
  } else if (xApiKey) {
    rawKey = xApiKey.trim();
  }

  if (!rawKey) {
    return {
      valid: false,
      status: 401,
      error:
        "Missing API key. Provide via Authorization: Bearer <key> or x-api-key header. Get your key at https://seo-lens.site/dashboard",
    };
  }

  const hash = hashKey(rawKey);
  const supabase = getSupabase();

  const { data: keyRecord, error } = await supabase
    .from("api_keys")
    .select("id, key_prefix, name, daily_limit, is_active")
    .eq("key_hash", hash)
    .single();

  if (error || !keyRecord) {
    return { valid: false, status: 401, error: "Invalid API key." };
  }

  if (!keyRecord.is_active) {
    return {
      valid: false,
      status: 403,
      error: "API key has been deactivated.",
    };
  }

  // Atomic increment and get count
  const today = new Date().toISOString().slice(0, 10);
  const { data: currentCount, error: rpcError } = await supabase.rpc(
    "increment_api_usage",
    { p_key_id: keyRecord.id, p_date: today }
  );

  if (rpcError) {
    console.error("Rate limit check failed:", rpcError);
    // Allow on error - don't block legitimate requests due to rate limit infrastructure issues
  }

  const count = (currentCount as number) ?? 0;
  if (count > keyRecord.daily_limit) {
    return {
      valid: false,
      status: 429,
      error: `Daily rate limit exceeded (${keyRecord.daily_limit} requests/day). Resets at midnight UTC.`,
    };
  }

  // Update last_used_at (fire-and-forget)
  supabase
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", keyRecord.id)
    .then(() => {});

  return { valid: true, apiKey: keyRecord as ApiKeyRecord, usage: count };
}

// --- Key creation ---

export async function createApiKey(
  userId: string,
  name: string
): Promise<{ raw: string; prefix: string } | null> {
  const { raw, hash, prefix } = generateApiKey();
  const supabase = getSupabase();

  const { error } = await supabase.from("api_keys").insert({
    user_id: userId,
    key_hash: hash,
    key_prefix: prefix,
    name: name || "Unnamed",
    daily_limit: 100,
  });

  if (error) {
    console.error("Failed to create API key:", error);
    return null;
  }

  return { raw, prefix };
}

// --- Internal request guard ---

export function isInternalRequest(req: Request): boolean {
  if (process.env.NODE_ENV === "development") return true;

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const allowedHosts = [
    process.env.NEXT_PUBLIC_SITE_URL || "https://seo-lens.site",
    "https://seolens.dev",
    "https://www.seo-lens.site",
  ];

  for (const host of allowedHosts) {
    if (origin?.startsWith(host)) return true;
    if (referer?.startsWith(host)) return true;
  }

  return false;
}
