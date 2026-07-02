import type { RaciData, StakeholderRole } from "@/lib/types";

const roleLabel: Record<StakeholderRole, string> = {
  sponsor: "老闆/贊助者",
  consultant: "顧問",
  dev: "開發/執行",
  "delivery-target": "交付對象",
  pm: "PM",
  other: "其他",
};

const letterClass: Record<string, string> = {
  R: "text-series-1",
  A: "text-status-critical font-bold",
  C: "text-series-3",
  I: "text-text-muted",
  "": "text-text-muted",
};

export default function RaciTable({ data }: { data: RaciData }) {
  const stakeholders = data.stakeholders;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {stakeholders.map((s) => (
          <span
            key={s.name}
            className="rounded-full border border-hairline bg-surface-1 px-3 py-1 text-xs"
          >
            <span className="font-medium">{s.name}</span>
            <span className="text-text-muted"> · {roleLabel[s.role]}</span>
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-hairline">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface-1">
              <th className="border-b border-gridline px-3 py-2 text-left font-medium text-text-secondary">
                交付物 / 決策點
              </th>
              {stakeholders.map((s) => (
                <th
                  key={s.name}
                  className="border-b border-gridline px-3 py-2 text-center font-medium text-text-secondary"
                >
                  {s.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.matrix.map((row) => (
              <tr key={row.item} className="odd:bg-surface-1/60">
                <td className="border-b border-gridline px-3 py-2 text-text-primary">
                  {row.item}
                </td>
                {stakeholders.map((s) => {
                  const letter = row.assignments[s.name] ?? "";
                  return (
                    <td
                      key={s.name}
                      className={`border-b border-gridline px-3 py-2 text-center tabular-nums ${letterClass[letter]}`}
                    >
                      {letter || "–"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.conflicts.length > 0 && (
        <div className="rounded-lg border border-status-critical/30 bg-status-critical/10 p-3">
          <div className="mb-1 text-xs font-medium text-status-critical">責任衝突待裁定</div>
          <ul className="list-inside list-disc text-sm text-text-primary">
            {data.conflicts.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(data.watchouts).map(([role, items]) => (
          <div key={role} className="rounded-lg border border-hairline bg-surface-1 p-3">
            <div className="mb-1 text-xs font-medium text-text-secondary">
              {roleLabel[role as StakeholderRole] ?? role} 的注意事項
            </div>
            <ul className="list-inside list-disc text-sm text-text-primary">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
