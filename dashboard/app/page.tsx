import Link from "next/link";
import { listProjects } from "@/lib/data";

export default function Home() {
  const projects = listProjects();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-text-primary">PM Designer 儀表板</h1>
      <p className="mt-2 text-sm text-text-secondary">
        讀取 <code className="rounded bg-surface-1 px-1 py-0.5">data/&lt;owner&gt;/&lt;project&gt;/pm-workspace/</code>{" "}
        底下由 pm-* skill 產出的 JSON，純檢視、不含 AI 生成。
      </p>

      <div className="mt-8 space-y-2">
        {projects.map((p) => (
          <Link
            key={`${p.owner}/${p.slug}`}
            href={`/${p.owner}/${p.slug}`}
            className="block rounded-lg border border-hairline bg-surface-1 px-4 py-3 hover:border-series-1"
          >
            <div className="font-medium text-text-primary">{p.name}</div>
            <div className="text-xs text-text-muted">
              {p.owner} / {p.slug}
            </div>
          </Link>
        ))}
        {projects.length === 0 && (
          <div className="rounded-lg border border-dashed border-hairline px-4 py-6 text-center text-sm text-text-muted">
            找不到任何專案。在 <code>data/&lt;owner&gt;/&lt;project&gt;/pm-workspace/</code> 建立對應的 JSON
            檔案後重新整理。
          </div>
        )}
      </div>
    </main>
  );
}
