import { useMemo, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { issues as allIssues, staff } from "@/lib/data";
import type { Issue, IssueStatus } from "@shared/api";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function IssuesPage() {
  const [status, setStatus] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Issue | null>(null);

  const categories = Array.from(new Set(allIssues.map((i) => i.category)));

  const issues = useMemo(() => {
    return allIssues.filter((i) =>
      (status === "all" || i.status === status) &&
      (category === "all" || i.category === category) &&
      (q.trim() === "" || i.description.toLowerCase().includes(q.toLowerCase()) || i.location.address?.toLowerCase().includes(q.toLowerCase()))
    );
  }, [status, category, q]);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Filter Issues</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label htmlFor="q">Search</Label>
              <Input id="q" placeholder="Search by description or location" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="RESOLVED">Resolved</SelectItem>
                  <SelectItem value="CRITICAL">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => { setQ(""); setStatus("all"); setCategory("all"); }}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.map((i) => (
                    <TableRow key={i.id}>
                      <TableCell><img src={i.photoUrl || "/placeholder.svg"} alt="" className="size-12 rounded-md object-cover" /></TableCell>
                      <TableCell>{i.category}</TableCell>
                      <TableCell className="whitespace-nowrap">{i.location.address || i.location.ward}</TableCell>
                      <TableCell className="max-w-[340px] truncate" title={i.description}>{i.description}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full border ${statusClass(i.status)}`}>
                          {i.status.replace("_"," ")}
                        </span>
                      </TableCell>
                      <TableCell>{staff.find((s) => s.id === i.assignedTo)?.name || "—"}</TableCell>
                      <TableCell><Button size="sm" onClick={() => setSelected(i)}>Open</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <IssueDrawer issue={selected} onClose={() => setSelected(null)} />
    </AppLayout>
  );
}

function statusClass(s: IssueStatus) {
  if (s === "CRITICAL") return "border-status-critical/40 text-status-critical bg-status-critical/10";
  if (s === "PENDING") return "border-status-warning/40 text-status-warning bg-status-warning/10";
  if (s === "RESOLVED") return "border-status-success/40 text-status-success bg-status-success/10";
  return "border-primary/40 text-primary bg-primary/10";
}

function IssueDrawer({ issue, onClose }: { issue: Issue | null; onClose: () => void }) {
  const [status, setStatus] = useState<IssueStatus | "">(issue?.status || "");
  const [assignee, setAssignee] = useState<string>(issue?.assignedTo || "");
  const [note, setNote] = useState("");

  return (
    <Drawer open={!!issue} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DrawerContent className="max-w-3xl mx-auto">
        <DrawerHeader>
          <DrawerTitle>Issue Details</DrawerTitle>
        </DrawerHeader>
        {issue && (
          <div className="grid gap-6 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <img src={issue.photoUrl || "/placeholder.svg"} alt="" className="w-full h-48 object-cover rounded-md" />
                <div className="text-sm text-muted-foreground mt-2">{issue.location.address || issue.location.ward}</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold">{issue.category}</div>
                <div className="text-sm">{issue.description}</div>
                <div className="text-sm">Reporter: {issue.reporter?.name} · {issue.reporter?.phone}</div>
                <div className="text-sm">Current Status: {issue.status.replace("_"," ")}</div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as IssueStatus)}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Assign to</Label>
                <Select value={assignee} onValueChange={(v) => setAssignee(v)}>
                  <SelectTrigger><SelectValue placeholder="Select staff" /></SelectTrigger>
                  <SelectContent>
                    {staff.map((s) => (<SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Upload proof</Label>
                <Input type="file" accept="image/*,application/pdf" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Internal notes</Label>
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note for staff..." />
              <div className="flex gap-2 justify-end"><Button variant="outline" onClick={onClose}>Close</Button><Button>Save</Button></div>
            </div>

            <div className="grid gap-2">
              <div className="font-medium">Status Timeline</div>
              <ul className="space-y-2">
                {issue.timeline?.map((t, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{new Date(t.at).toLocaleString()}</span> — {t.status.replace("_"," ")}{t.note ? ` · ${t.note}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
