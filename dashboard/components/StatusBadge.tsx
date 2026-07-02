import { severityClasses, type SeverityInfo } from "@/lib/status";

export default function StatusBadge({ info }: { info: SeverityInfo }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${severityClasses[info.severity]}`}
    >
      <span aria-hidden="true">{info.icon}</span>
      {info.label}
    </span>
  );
}
