export type StakeholderRole =
  | "sponsor"
  | "consultant"
  | "dev"
  | "delivery-target"
  | "pm"
  | "other";

export type RaciLetter = "R" | "A" | "C" | "I" | "";

export interface Stakeholder {
  name: string;
  role: StakeholderRole;
  notes?: string;
}

export interface RaciRow {
  item: string;
  assignments: Record<string, RaciLetter>;
}

export interface RaciData {
  stakeholders: Stakeholder[];
  matrix: RaciRow[];
  conflicts: string[];
  watchouts: Record<string, string[]>;
}

export type WbsStatus = "not-started" | "in-progress" | "blocked" | "done";

export interface Milestone {
  id: string;
  name: string;
  dueDate?: string;
}

export interface WorkPackage {
  id: string;
  name: string;
  milestoneId?: string;
  owner?: string;
  status: WbsStatus;
  dependsOn?: string[];
  risk?: string;
  estimate?: string;
}

export interface WbsData {
  milestones: Milestone[];
  workPackages: WorkPackage[];
}

export type ActionItemStatus = "open" | "done";

export interface ActionItem {
  id: string;
  description: string;
  owner?: string;
  dueDate?: string;
  status: ActionItemStatus;
  linkedWbsId?: string;
}

export interface MeetingRecord {
  date: string;
  topic: string;
  type?: string;
  plannedMinutes?: number;
  actualMinutes?: number;
  actionItems: ActionItem[];
  decisions?: string[];
}

export interface StatusLogEntry {
  date: string;
  summary: string;
  openItems?: string[];
  decisions?: string[];
  nextCheckIn?: string;
}

export interface StatusLog {
  entries: StatusLogEntry[];
}

export interface ProjectRef {
  owner: string;
  slug: string;
  name: string;
}

export interface ProjectData {
  ref: ProjectRef;
  raci?: RaciData;
  wbs?: WbsData;
  meetings: MeetingRecord[];
  statusLog?: StatusLog;
}
