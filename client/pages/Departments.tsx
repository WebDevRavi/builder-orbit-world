import AppLayout from "@/components/layout/AppLayout";
import { departments, staff } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";

export default function DepartmentsPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => staff.filter((s) => s.name.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {departments.map((d) => (
            <Card key={d.id}>
              <CardHeader>
                <CardTitle className="text-base">{d.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{d.description}</p>
                <Button variant="outline" size="sm">View</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 mb-4">
              <div className="max-w-xs w-full">
                <Label htmlFor="q">Search staff</Label>
                <Input id="q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" />
              </div>
              <Button>Add Staff</Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Resolved</TableHead>
                    <TableHead>Avg Time (hrs)</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.role}</TableCell>
                      <TableCell>{departments.find((d) => d.id === s.departmentId)?.name}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>{s.stats?.resolved ?? 0}</TableCell>
                      <TableCell>{s.stats?.avgTimeHours ?? 0}</TableCell>
                      <TableCell className="text-right"><Button variant="outline" size="sm">Manage</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
