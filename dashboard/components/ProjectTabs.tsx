"use client";

import { useState } from "react";
import type { ProjectData } from "@/lib/types";
import RaciTable from "./RaciTable";
import WbsBoard from "./WbsBoard";
import ActionItemsList from "./ActionItemsList";
import StatusTimeline from "./StatusTimeline";

const tabs = [
  { key: "raci", label: "RACI" },
  { key: "wbs", label: "WBS" },
  { key: "actions", label: "會議 / Action Items" },
  { key: "timeline", label: "時間軸 / 狀態總表" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function ProjectTabs({ project }: { project: ProjectData }) {
  const [active, setActive] = useState<TabKey>("raci");

  return (
    <div>
      <div className="flex gap-1 border-b border-gridline">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              active === tab.key
                ? "border-b-2 border-series-1 text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-6">
        {active === "raci" &&
          (project.raci ? (
            <RaciTable data={project.raci} />
          ) : (
            <EmptyState text="尚無 RACI 資料，跑一次 pm-raci-watchouts 後會出現在這裡" />
          ))}
        {active === "wbs" &&
          (project.wbs ? (
            <WbsBoard data={project.wbs} />
          ) : (
            <EmptyState text="尚無 WBS 資料，跑一次 pm-wbs-kickoff 後會出現在這裡" />
          ))}
        {active === "actions" && <ActionItemsList meetings={project.meetings} />}
        {active === "timeline" && (
          <StatusTimeline meetings={project.meetings} statusLog={project.statusLog} />
        )}
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-hairline px-4 py-8 text-center text-sm text-text-muted">
      {text}
    </div>
  );
}
