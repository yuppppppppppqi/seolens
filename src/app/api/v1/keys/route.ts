import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabase } from "@/lib/supabase";
import { createApiKey } from "@/lib/api-auth";

async function getUser(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll() {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// List API keys for authenticated user
export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const today = new Date().toISOString().slice(0, 10);

  const { data: keys, error } = await supabase
    .from("api_keys")
    .select(
      "id, key_prefix, name, daily_limit, is_active, created_at, last_used_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch keys" },
      { status: 500 }
    );
  }

  // Get today's usage for each key
  const keyIds = (keys ?? []).map((k) => k.id);
  const { data: usageData } = await supabase
    .from("api_usage")
    .select("api_key_id, request_count")
    .in("api_key_id", keyIds)
    .eq("date", today);

  const usageMap = new Map(
    (usageData ?? []).map((u) => [u.api_key_id, u.request_count])
  );

  const keysWithUsage = (keys ?? []).map((k) => ({
    ...k,
    todayUsage: usageMap.get(k.id) ?? 0,
  }));

  return NextResponse.json({ keys: keysWithUsage });
}

// Create new API key
export async function POST(req: NextRequest) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "name (string) is required" },
        { status: 400 }
      );
    }

    // Limit to 5 keys per user
    const supabase = getSupabase();
    const { count } = await supabase
      .from("api_keys")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (count !== null && count >= 5) {
      return NextResponse.json(
        { error: "Maximum 5 API keys per account" },
        { status: 400 }
      );
    }

    const result = await createApiKey(user.id, name.trim());

    if (!result) {
      return NextResponse.json(
        { error: "Failed to create API key" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      apiKey: result.raw,
      prefix: result.prefix,
      message: "Save this API key now. It will not be shown again.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create API key" },
      { status: 500 }
    );
  }
}

// Delete API key
export async function DELETE(req: NextRequest) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const keyId = searchParams.get("id");

    if (!keyId) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from("api_keys")
      .delete()
      .eq("id", keyId)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete key" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete key" },
      { status: 500 }
    );
  }
}
