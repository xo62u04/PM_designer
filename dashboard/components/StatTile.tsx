export default function StatTile({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  tone?: "neutral" | "good" | "warning" | "critical";
}) {
  const toneClass =
    tone === "good"
      ? "text-status-good"
      : tone === "warning"
        ? "text-[color:var(--status-warning)]"
        : tone === "critical"
          ? "text-status-critical"
          : "text-text-primary";

  return (
    <div className="rounded-lg border border-hairline bg-surface-1 px-4 py-3">
      <div className="text-xs text-text-muted">{label}</div>
      <div className={`tabular-nums text-2xl font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}
