import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { issues, notifications } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Bell, FolderOpen, BarChart3, Building2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

export default function Dashboard() {
  const navigate = useNavigate();

  const total = issues.length;
  const pending = issues.filter((i) => i.status === "PENDING").length;
  const inProgress = issues.filter((i) => i.status === "IN_PROGRESS").length;
  const resolved = issues.filter((i) => i.status === "RESOLVED").length;

  const byCategory = Object.values(
    issues.reduce<Record<string, number>>((acc, i) => {
      acc[i.category] = (acc[i.category] || 0) + 1;
      return acc;
    }, {}),
  ).map((v, idx) => v);
  const pieData = Object.entries(
    issues.reduce<Record<string, number>>((acc, i) => {
      acc[i.category] = (acc[i.category] || 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));
  const barData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Resolved", value: resolved },
  ];
  const pieColors = [
    "hsl(var(--primary))",
    "hsl(var(--status-warning))",
    "hsl(var(--status-success))",
    "hsl(var(--status-critical))",
  ]; // rotate as needed

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Issues" value={total.toString()} />
          <StatCard title="Pending" value={pending.toString()} tone="warning" />
          <StatCard
            title="In Progress"
            value={inProgress.toString()}
            tone="info"
          />
          <StatCard
            title="Resolved"
            value={resolved.toString()}
            tone="success"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Status Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>By Category</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    innerRadius={40}
                  >
                    {pieData.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={pieColors[idx % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {notifications.slice(0, 6).map((n) => (
                  <li key={n.id} className="py-3 flex items-start gap-3">
                    <Bell className="mt-0.5 size-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{n.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {n.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button
                className="justify-start"
                variant="outline"
                onClick={() => navigate("/issues")}
              >
                <FolderOpen className="mr-2 size-4" /> View Issues
              </Button>
              <Button
                className="justify-start"
                variant="outline"
                onClick={() => navigate("/analytics")}
              >
                <BarChart3 className="mr-2 size-4" /> Analytics
              </Button>
              <Button
                className="justify-start"
                variant="outline"
                onClick={() => navigate("/departments")}
              >
                <Building2 className="mr-2 size-4" /> Departments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({
  title,
  value,
  tone,
}: {
  title: string;
  value: string;
  tone?: "success" | "warning" | "info";
}) {
  const color =
    tone === "success"
      ? "text-status-success"
      : tone === "warning"
        ? "text-status-warning"
        : tone === "info"
          ? "text-primary"
          : "text-foreground";
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="text-sm text-muted-foreground">{title}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${color}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
