/**
 * Shared types for the Crowdsourced Civic Issue Reporting and Resolution System
 */

export type Role = "ADMIN" | "DEPT_HEAD" | "STAFF";
export type LanguageCode = "en" | "hi";

export type IssueStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED" | "CRITICAL";

export interface CitizenInfo {
  name: string;
  phone: string;
  email?: string;
  language?: LanguageCode;
}

export interface Issue {
  id: string;
  category: string;
  description: string;
  voiceNoteText?: string;
  photoUrl?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  location: {
    lat: number;
    lng: number;
    ward?: string;
    address?: string;
  };
  status: IssueStatus;
  assignedTo?: string; // staff id
  reporter?: CitizenInfo;
  timeline?: Array<{
    at: string; // ISO
    status: IssueStatus;
    note?: string;
    by?: string; // staff id
  }>;
  attachments?: string[]; // URLs
}

export interface Department {
  id: string;
  name: string;
  description?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: Role;
  departmentId: string;
  email: string;
  phone?: string;
  stats?: {
    resolved: number;
    avgTimeHours: number;
  };
}

export interface NotificationItem {
  id: string;
  type: "NEW_ISSUE" | "ASSIGNMENT" | "STATUS_UPDATE";
  title: string;
  message: string;
  createdAt: string; // ISO
  read?: boolean;
  issueId?: string;
}

export interface AnalyticsSummary {
  totalIssues: number;
  pending: number;
  inProgress: number;
  resolved: number;
}

export interface ExportOptions {
  format: "csv" | "xlsx" | "pdf";
  range?: { from: string; to: string };
}

// Example response type for /api/demo (kept for reference)
export interface DemoResponse {
  message: string;
}
