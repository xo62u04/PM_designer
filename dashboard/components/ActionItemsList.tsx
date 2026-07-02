import type { MeetingRecord } from "@/lib/types";
import { actionItemInfo } from "@/lib/status";
import StatusBadge from "./StatusBadge";
import StatTile from "./StatTile";

interface Row {
  meetingDate: string;
  meetingTopic: string;
  description: string;
  owner?: string;
  dueDate?: string;
  status: "open" | "done";
  linkedWbsId?: string;
}

const severityRank = { critical: 0, warning: 1, serious: 2, neutral: 3, good: 4 };

export default function ActionItemsList({ meetings }: { meetings: MeetingRecord[] }) {
  const rows: Row[] = meetings.flatMap((m) =>
    m.actionItems.map((item) => ({
      meetingDate: m.date,
      meetingTopic: m.topic,
      description: item.description,
      owner: item.owner,
      dueDate: item.dueDate,
      status: item.status,
      linkedWbsId: item.linkedWbsId,
    }))
  );

  const withInfo = rows.map((row) => ({
    row,
    info: actionItemInfo({
      id: "",
      description: row.description,
      owner: row.owner,
      dueDate: row.dueDate,
      status: row.status,
    }),
  }));

  withInfo.sort((a, b) => severityRank[a.info.severity] - severityRank[b.info.severity]);

  const openCount = rows.filter((r) => r.status === "open").length;
  const overdueCount = withInfo.filter(
    (r) => r.info.severity === "critical" && r.row.status === "open"
  ).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile label="Action item 總數" value={rows.length} />
        <StatTile label="未結案" value={openCount} tone={openCount > 0 ? "warning" : "good"} />
        <StatTile label="逾期" value={overdueCount} tone={overdueCount > 0 ? "critical" : "good"} />
      </div>

      <div className="overflow-x-auto rounded-lg border border-hairline">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface-1">
              <th className="border-b border-gridline px-3 py-2 text-left font-medium text-text-secondary">
                事項
              </th>
              <th className="border-b border-gridline px-3 py-2 text-left font-medium text-text-secondary">
                負責人
              </th>
              <th className="border-b border-gridline px-3 py-2 text-left font-medium text-text-secondary">
                截止日
              </th>
              <th className="border-b border-gridline px-3 py-2 text-left font-medium text-text-secondary">
                狀態
              </th>
              <th className="border-b border-gridline px-3 py-2 text-left font-medium text-text-secondary">
                來源會議
              </th>
            </tr>
          </thead>
          <tbody>
            {withInfo.map(({ row, info }, i) => (
              <tr key={i} className="odd:bg-surface-1/60">
                <td className="border-b border-gridline px-3 py-2 text-text-primary">
                  {row.description}
                  {row.linkedWbsId && (
                    <span className="ml-2 text-xs text-text-muted">→ {row.linkedWbsId}</span>
                  )}
                </td>
                <td className="border-b border-gridline px-3 py-2 text-text-secondary">
                  {row.owner ?? "–"}
                </td>
                <td className="border-b border-gridline px-3 py-2 tabular-nums text-text-secondary">
                  {row.dueDate ?? "–"}
                </td>
                <td className="border-b border-gridline px-3 py-2">
                  <StatusBadge info={info} />
                </td>
                <td className="border-b border-gridline px-3 py-2 text-xs text-text-muted">
                  {row.meetingTopic} · {row.meetingDate}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-sm text-text-muted">
                  尚無 action item，跑一次 pm-meeting-loop 之後會出現在這裡
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
