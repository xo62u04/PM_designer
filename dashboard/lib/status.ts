import type { ActionItem, WbsStatus } from "./types";

export type Severity = "good" | "warning" | "serious" | "critical" | "neutral";

export interface SeverityInfo {
  severity: Severity;
  label: string;
  icon: string;
}

export function wbsStatusInfo(status: WbsStatus): SeverityInfo {
  switch (status) {
    case "done":
      return { severity: "good", label: "已完成", icon: "✓" };
    case "in-progress":
      return { severity: "neutral", label: "進行中", icon: "●" };
    case "blocked":
      return { severity: "critical", label: "卡住", icon: "✗" };
    case "not-started":
    default:
      return { severity: "neutral", label: "未開始", icon: "○" };
  }
}

export function actionItemInfo(item: ActionItem, today: Date = new Date()): SeverityInfo {
  if (item.status === "done") {
    return { severity: "good", label: "已完成", icon: "✓" };
  }
  if (!item.dueDate) {
    return { severity: "neutral", label: "無截止日", icon: "○" };
  }
  const due = new Date(item.dueDate);
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    return { severity: "critical", label: `逾期 ${Math.abs(diffDays)} 天`, icon: "✗" };
  }
  if (diffDays <= 3) {
    return { severity: "warning", label: `${diffDays} 天內到期`, icon: "⚠" };
  }
  return { severity: "good", label: "如期進行", icon: "●" };
}

export const severityClasses: Record<Severity, string> = {
  good: "text-status-good border-status-good/30 bg-status-good/10",
  warning: "text-[color:var(--status-warning)] border-[color:var(--status-warning)]/40 bg-[color:var(--status-warning)]/15",
  serious: "text-status-serious border-status-serious/30 bg-status-serious/10",
  critical: "text-status-critical border-status-critical/30 bg-status-critical/10",
  neutral: "text-text-secondary border-baseline/50 bg-text-secondary/5",
};
