import type { MeetingRecord, StatusLog } from "@/lib/types";

function DurationNote({ meeting }: { meeting: MeetingRecord }) {
  if (!meeting.plannedMinutes || !meeting.actualMinutes) return null;
  const overrun = meeting.actualMinutes - meeting.plannedMinutes;
  if (overrun <= 0) {
    return <span className="text-status-good">準時（{meeting.actualMinutes} 分鐘）</span>;
  }
  return (
    <span className="text-status-critical">
      超時 {overrun} 分鐘（預定 {meeting.plannedMinutes} → 實際 {meeting.actualMinutes}）
    </span>
  );
}

export default function StatusTimeline({
  meetings,
  statusLog,
}: {
  meetings: MeetingRecord[];
  statusLog?: StatusLog;
}) {
  const entries = statusLog?.entries ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium text-text-secondary">會議時間軸</h3>
        <ol className="space-y-3 border-l border-gridline pl-4">
          {meetings.map((m, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-series-1" />
              <div className="text-sm font-medium text-text-primary">
                {m.date} · {m.topic}
              </div>
              <div className="text-xs text-text-secondary">
                <DurationNote meeting={m} />
              </div>
              {m.decisions && m.decisions.length > 0 && (
                <ul className="mt-1 list-inside list-disc text-xs text-text-muted">
                  {m.decisions.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          {meetings.length === 0 && (
            <li className="text-sm text-text-muted">尚無會議記錄</li>
          )}
        </ol>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-text-secondary">狀態總表</h3>
        <div className="space-y-2">
          {entries.map((e, i) => (
            <div key={i} className="rounded-lg border border-hairline bg-surface-1 p-3">
              <div className="text-sm font-medium text-text-primary">
                {e.date} · {e.summary}
              </div>
              {e.openItems && e.openItems.length > 0 && (
                <div className="mt-1 text-xs text-text-secondary">
                  未解決事項：{e.openItems.join("、")}
                </div>
              )}
              {e.nextCheckIn && (
                <div className="mt-1 text-xs text-text-muted">下次追蹤：{e.nextCheckIn}</div>
              )}
            </div>
          ))}
          {entries.length === 0 && (
            <div className="text-sm text-text-muted">尚無狀態總表資料</div>
          )}
        </div>
      </div>
    </div>
  );
}
