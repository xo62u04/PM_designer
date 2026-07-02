import fs from "fs";
import path from "path";
import type {
  MeetingRecord,
  ProjectData,
  ProjectRef,
  RaciData,
  StatusLog,
  WbsData,
} from "./types";

// Data lives outside the dashboard app so the same pm-workspace files the
// pm-* skills write to (see ../ARCHITECTURE.md) can be read here without
// duplication. Layout: <root>/<owner>/<project-slug>/pm-workspace/*.json
function getDataRoot(): string {
  return process.env.PM_DESIGNER_DATA_ROOT
    ? path.resolve(process.env.PM_DESIGNER_DATA_ROOT)
    : path.resolve(process.cwd(), "..", "data");
}

function readJsonIfExists<T>(filePath: string): T | undefined {
  if (!fs.existsSync(filePath)) return undefined;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return undefined;
  }
}

function projectDisplayName(owner: string, slug: string): string {
  const projectJson = readJsonIfExists<{ name?: string }>(
    path.join(getDataRoot(), owner, slug, "project.json")
  );
  return projectJson?.name ?? slug;
}

export function listProjects(): ProjectRef[] {
  const root = getDataRoot();
  if (!fs.existsSync(root)) return [];

  const refs: ProjectRef[] = [];
  for (const owner of fs.readdirSync(root, { withFileTypes: true })) {
    if (!owner.isDirectory()) continue;
    const ownerPath = path.join(root, owner.name);
    for (const project of fs.readdirSync(ownerPath, { withFileTypes: true })) {
      if (!project.isDirectory()) continue;
      const workspacePath = path.join(ownerPath, project.name, "pm-workspace");
      if (!fs.existsSync(workspacePath)) continue;
      refs.push({
        owner: owner.name,
        slug: project.name,
        name: projectDisplayName(owner.name, project.name),
      });
    }
  }
  return refs;
}

export function loadProject(owner: string, slug: string): ProjectData | undefined {
  const root = getDataRoot();
  const workspacePath = path.join(root, owner, slug, "pm-workspace");
  if (!fs.existsSync(workspacePath)) return undefined;

  const raci = readJsonIfExists<RaciData>(
    path.join(workspacePath, "01-stakeholders-raci.json")
  );
  const wbs = readJsonIfExists<WbsData>(path.join(workspacePath, "02-wbs.json"));
  const statusLog = readJsonIfExists<StatusLog>(
    path.join(workspacePath, "03-status-log.json")
  );

  const meetingsDir = path.join(workspacePath, "meetings");
  const meetings: MeetingRecord[] = [];
  if (fs.existsSync(meetingsDir)) {
    for (const file of fs.readdirSync(meetingsDir)) {
      if (!file.endsWith(".json")) continue;
      const record = readJsonIfExists<MeetingRecord>(path.join(meetingsDir, file));
      if (record) meetings.push(record);
    }
    meetings.sort((a, b) => a.date.localeCompare(b.date));
  }

  return {
    ref: { owner, slug, name: projectDisplayName(owner, slug) },
    raci,
    wbs,
    meetings,
    statusLog,
  };
}
