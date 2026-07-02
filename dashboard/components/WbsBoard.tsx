import type { WbsData, WbsStatus, WorkPackage } from "@/lib/types";
import { wbsStatusInfo } from "@/lib/status";
import StatusBadge from "./StatusBadge";
import StatTile from "./StatTile";

const columns: { status: WbsStatus; heading: string }[] = [
  { status: "not-started", heading: "未開始" },
  { status: "in-progress", heading: "進行中" },
  { status: "blocked", heading: "卡住" },
  { status: "done", heading: "已完成" },
];

function WorkPackageCard({ pkg, milestoneName }: { pkg: WorkPackage; milestoneName?: string }) {
  return (
    <div className="rounded-lg border border-hairline bg-surface-1 p-3">
      <div className="text-sm font-medium text-text-primary">{pkg.name}</div>
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
        {milestoneName && (
          <span className="rounded-full border border-hairline px-2 py-0.5">{milestoneName}</span>
        )}
        {pkg.owner ? (
          <span>負責人：{pkg.owner}</span>
        ) : (
          <span className="text-status-critical">待指派</span>
        )}
        {pkg.estimate && <span>· {pkg.estimate}</span>}
      </div>
      {pkg.dependsOn && pkg.dependsOn.length > 0 && (
        <div className="mt-1 text-xs text-text-muted">相依：{pkg.dependsOn.join(", ")}</div>
      )}
      {pkg.risk && (
        <div className="mt-2 rounded border border-status-warning/40 bg-[color:var(--status-warning)]/10 px-2 py-1 text-xs text-text-primary">
          風險：{pkg.risk}
        </div>
      )}
    </div>
  );
}

export default function WbsBoard({ data }: { data: WbsData }) {
  const total = data.workPackages.length;
  const done = data.workPackages.filter((p) => p.status === "done").length;
  const blocked = data.workPackages.filter((p) => p.status === "blocked").length;
  const unassigned = data.workPackages.filter((p) => !p.owner).length;
  const milestoneNameById = Object.fromEntries(
    data.milestones.map((m) => [m.id, m.name])
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="工作包總數" value={total} />
        <StatTile label="已完成" value={`${done}/${total}`} tone="good" />
        <StatTile label="卡住" value={blocked} tone={blocked > 0 ? "critical" : "neutral"} />
        <StatTile label="待指派負責人" value={unassigned} tone={unassigned > 0 ? "warning" : "neutral"} />
      </div>

      {data.milestones.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.milestones.map((m) => (
            <span
              key={m.id}
              className="rounded-full border border-hairline bg-surface-1 px-3 py-1 text-xs text-text-secondary"
            >
              {m.name}
              {m.dueDate && <span className="text-text-muted"> · {m.dueDate}</span>}
            </span>
          ))}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-4">
        {columns.map((col) => {
          const items = data.workPackages.filter((p) => p.status === col.status);
          return (
            <div key={col.status} className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <StatusBadge info={wbsStatusInfo(col.status)} />
                <span className="tabular-nums text-xs text-text-muted">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((pkg) => (
                  <WorkPackageCard
                    key={pkg.id}
                    pkg={pkg}
                    milestoneName={pkg.milestoneId ? milestoneNameById[pkg.milestoneId] : undefined}
                  />
                ))}
                {items.length === 0 && (
                  <div className="rounded-lg border border-dashed border-hairline px-3 py-4 text-center text-xs text-text-muted">
                    無項目
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
