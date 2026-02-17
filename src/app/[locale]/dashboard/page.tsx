"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

interface ApiKey {
  id: number;
  key_prefix: string;
  name: string;
  daily_limit: number;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
  todayUsage: number;
}

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const router = useRouter();

  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState("");
  const [creating, setCreating] = useState(false);
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchKeys = useCallback(async () => {
    const res = await fetch("/api/v1/keys");
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    const data = await res.json();
    setKeys(data.keys ?? []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
      } else {
        fetchKeys();
      }
    });
  }, [router, fetchKeys]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    setCreating(true);
    setError(null);

    const res = await fetch("/api/v1/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newKeyName.trim() }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      setNewKeyValue(data.apiKey);
      setNewKeyName("");
      fetchKeys();
    }
    setCreating(false);
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/v1/keys?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchKeys();
    }
  }

  async function handleLogout() {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/");
  }

  function copyKey() {
    if (newKeyValue) {
      navigator.clipboard.writeText(newKeyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-sl-text-muted">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-sl-text-primary">
          {t("title")}
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-sl-text-muted hover:text-sl-text-primary transition-colors"
        >
          {t("logout")}
        </button>
      </div>

      {/* New key revealed */}
      {newKeyValue && (
        <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <p className="text-sm font-medium text-emerald-400 mb-2">
            {t("newKeyCreated")}
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-lg bg-sl-bg-base border border-sl-border px-3 py-2 text-sm font-mono text-sl-text-primary break-all">
              {newKeyValue}
            </code>
            <button
              onClick={copyKey}
              className="shrink-0 rounded-lg border border-sl-border px-3 py-2 text-sm font-medium text-sl-text-secondary hover:text-sl-text-primary hover:bg-sl-bg-hover transition-colors"
            >
              {copied ? t("copied") : t("copy")}
            </button>
          </div>
          <p className="text-xs text-sl-text-muted mt-2">{t("saveWarning")}</p>
          <button
            onClick={() => setNewKeyValue(null)}
            className="mt-2 text-xs text-sl-text-muted hover:text-sl-text-secondary"
          >
            {t("dismiss")}
          </button>
        </div>
      )}

      {/* Create key form */}
      <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6 mb-6">
        <h2 className="text-lg font-semibold text-sl-text-primary mb-4">
          {t("createKey")}
        </h2>
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder={t("keyNamePlaceholder")}
            required
            className="flex-1 rounded-lg border border-sl-border bg-sl-bg-elevated px-4 py-2.5 text-sm text-sl-text-primary placeholder:text-sl-text-muted focus:border-sl-accent focus:ring-1 focus:ring-sl-accent outline-none"
          />
          <button
            type="submit"
            disabled={creating || !newKeyName.trim()}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all"
          >
            {creating ? t("creating") : t("create")}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-sm text-red-400">{error}</p>
        )}
        <p className="mt-3 text-xs text-sl-text-muted">{t("freeLimit")}</p>
      </div>

      {/* Keys list */}
      <div className="rounded-xl border border-sl-border bg-sl-bg-surface overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-sl-border">
          <h2 className="text-lg font-semibold text-sl-text-primary">
            {t("yourKeys")} ({keys.length})
          </h2>
        </div>
        {keys.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-sl-text-muted">
            {t("noKeys")}
          </div>
        ) : (
          <div className="divide-y divide-sl-border">
            {keys.map((key) => (
              <div
                key={key.id}
                className="px-6 py-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-sl-text-primary">
                    {key.name}
                  </p>
                  <p className="text-xs text-sl-text-muted font-mono mt-0.5">
                    {key.key_prefix}...
                  </p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-sl-text-muted">
                      {t("todayUsage")}
                    </p>
                    <p className="text-sm font-mono text-sl-text-secondary">
                      {key.todayUsage} / {key.daily_limit}
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-sl-text-muted">
                      {t("created")}
                    </p>
                    <p className="text-xs text-sl-text-secondary">
                      {new Date(key.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(key.id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    {t("delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Documentation */}
      <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
        <h2 className="text-lg font-semibold text-sl-text-primary mb-4">
          {t("docsTitle")}
        </h2>

        {/* Base URL & Auth */}
        <div className="mb-4">
          <p className="text-xs text-sl-text-muted mb-2">{t("docsBaseUrl")}</p>
          <code className="block rounded-lg bg-sl-bg-elevated border border-sl-border px-3 py-2 text-sm font-mono text-sl-accent">
            POST https://seo-lens.site/api/v1/research
          </code>
        </div>

        <div className="mb-5">
          <p className="text-xs text-sl-text-muted mb-2">{t("docsAuth")}</p>
          <code className="block rounded-lg bg-sl-bg-elevated border border-sl-border px-3 py-2 text-sm font-mono text-sl-text-secondary">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>

        {/* cURL */}
        <div className="mb-4">
          <p className="text-xs font-medium text-sl-text-muted mb-2">cURL</p>
          <div className="rounded-lg bg-sl-bg-elevated border border-sl-border overflow-hidden">
            <pre className="p-3 overflow-x-auto text-xs text-sl-text-secondary font-mono leading-relaxed">
              <code>{`curl -X POST https://seo-lens.site/api/v1/research \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"keywords": ["nextjs seo"], "countryCode": "US"}'`}</code>
            </pre>
          </div>
        </div>

        {/* JavaScript */}
        <div className="mb-4">
          <p className="text-xs font-medium text-sl-text-muted mb-2">JavaScript</p>
          <div className="rounded-lg bg-sl-bg-elevated border border-sl-border overflow-hidden">
            <pre className="p-3 overflow-x-auto text-xs text-sl-text-secondary font-mono leading-relaxed">
              <code>{`const res = await fetch("https://seo-lens.site/api/v1/research", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY",
  },
  body: JSON.stringify({ keywords: ["nextjs seo"], countryCode: "US" }),
});
const data = await res.json();`}</code>
            </pre>
          </div>
        </div>

        {/* Python */}
        <div className="mb-4">
          <p className="text-xs font-medium text-sl-text-muted mb-2">Python</p>
          <div className="rounded-lg bg-sl-bg-elevated border border-sl-border overflow-hidden">
            <pre className="p-3 overflow-x-auto text-xs text-sl-text-secondary font-mono leading-relaxed">
              <code>{`import requests

res = requests.post(
    "https://seo-lens.site/api/v1/research",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={"keywords": ["nextjs seo"], "countryCode": "US"},
)
data = res.json()`}</code>
            </pre>
          </div>
        </div>

        {/* Parameters note */}
        <div className="rounded-lg bg-sl-bg-elevated border border-sl-border p-3">
          <p className="text-xs text-sl-text-muted leading-relaxed">
            {t("docsParams")}
          </p>
        </div>
      </div>
    </div>
  );
}
