import type { Issue, IssueStatus, Department, StaffMember, NotificationItem } from "@shared/api";

export const departments: Department[] = [
  { id: "sanitation", name: "Sanitation", description: "Waste management and cleanliness" },
  { id: "roads", name: "Roads", description: "Road repairs and maintenance" },
  { id: "power", name: "Power", description: "Electrical infrastructure" },
  { id: "water", name: "Water", description: "Water supply and drainage" },
];

export const staff: StaffMember[] = [
  { id: "u1", name: "Anita Sharma", role: "ADMIN", departmentId: "sanitation", email: "anita@jh.gov.in", stats: { resolved: 132, avgTimeHours: 28 } },
  { id: "u2", name: "Ravi Kumar", role: "DEPT_HEAD", departmentId: "roads", email: "ravi@jh.gov.in", stats: { resolved: 98, avgTimeHours: 42 } },
  { id: "u3", name: "Sunil Das", role: "STAFF", departmentId: "roads", email: "sunil@jh.gov.in", stats: { resolved: 61, avgTimeHours: 39 } },
  { id: "u4", name: "Pooja Verma", role: "STAFF", departmentId: "sanitation", email: "pooja@jh.gov.in", stats: { resolved: 77, avgTimeHours: 31 } },
];

const now = Date.now();

function daysAgo(n: number) { return new Date(now - n * 86400000).toISOString(); }

export const issues: Issue[] = [
  {
    id: "i1001",
    category: "Pothole",
    description: "Large pothole near Sector 4 market",
    photoUrl: "/placeholder.svg",
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
    location: { lat: 23.6102, lng: 85.2799, ward: "Ward 12", address: "Sector 4, Bokaro Steel City" },
    status: "IN_PROGRESS",
    assignedTo: "u3",
    reporter: { name: "Rahul Singh", phone: "+91 98765 43210", language: "en" },
    timeline: [
      { at: daysAgo(5), status: "PENDING", note: "Reported by citizen" },
      { at: daysAgo(4), status: "IN_PROGRESS", note: "Assigned to Roads team", by: "u2" },
    ],
  },
  {
    id: "i1002",
    category: "Garbage",
    description: "Overflowing garbage bin behind community hall",
    photoUrl: "/placeholder.svg",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(1),
    location: { lat: 23.3441, lng: 85.3096, ward: "Ward 6", address: "Ashok Nagar, Ranchi" },
    status: "CRITICAL",
    assignedTo: "u4",
    reporter: { name: "Sita Devi", phone: "+91 99887 77665", language: "hi" },
    timeline: [
      { at: daysAgo(2), status: "PENDING" },
      { at: daysAgo(1), status: "CRITICAL", note: "Escalated due to smell and animals" },
    ],
  },
  {
    id: "i1003",
    category: "Streetlight",
    description: "Streetlight flickering near Block B, House 12",
    photoUrl: "/placeholder.svg",
    createdAt: daysAgo(10),
    updatedAt: daysAgo(1),
    location: { lat: 22.8046, lng: 86.2029, ward: "Ward 3", address: "Sakchi, Jamshedpur" },
    status: "RESOLVED",
    assignedTo: "u1",
    reporter: { name: "Imran Ali", phone: "+91 90123 45678", language: "en" },
    timeline: [
      { at: daysAgo(10), status: "PENDING" },
      { at: daysAgo(8), status: "IN_PROGRESS", note: "Part ordered" },
      { at: daysAgo(1), status: "RESOLVED", note: "Replaced" },
    ],
  },
];

export const notifications: NotificationItem[] = [
  { id: "n1", type: "NEW_ISSUE", title: "New issue reported", message: "Garbage overflow in Ashok Nagar", createdAt: daysAgo(0) },
  { id: "n2", type: "ASSIGNMENT", title: "Task assigned", message: "Pothole near Sector 4 to Sunil Das", createdAt: daysAgo(1) },
  { id: "n3", type: "STATUS_UPDATE", title: "Status updated", message: "Streetlight issue resolved", createdAt: daysAgo(1) },
];

export function statusColor(status: IssueStatus) {
  switch (status) {
    case "CRITICAL": return "text-status-critical";
    case "PENDING": return "text-status-warning";
    case "IN_PROGRESS": return "text-primary";
    case "RESOLVED": return "text-status-success";
  }
}
