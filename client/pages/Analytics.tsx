import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { issues } from "@/lib/data";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

function toCSV(rows: any[]) {
  const keys = Object.keys(rows[0] || {});
  const csv = [keys.join(",")]
    .concat(
      rows.map((r) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(",")),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "report.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function AnalyticsPage() {
  const categories = Object.entries(
    issues.reduce<Record<string, number>>((acc, i) => {
      acc[i.category] = (acc[i.category] || 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));
  const responseTime = [
    { name: "Sanitation", hrs: 18 },
    { name: "Roads", hrs: 42 },
    { name: "Power", hrs: 27 },
    { name: "Water", hrs: 30 },
  ];
  const heatData = [
    { ward: "Ward 3", count: 12 },
    { ward: "Ward 6", count: 21 },
    { ward: "Ward 12", count: 8 },
    { ward: "Ward 14", count: 16 },
  ];
  const pieColors = [
    "hsl(var(--primary))",
    "hsl(var(--status-warning))",
    "hsl(var(--status-success))",
    "hsl(var(--status-critical))",
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => toCSV(issues)}>
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            Print
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Most Common Categories</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categories}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    innerRadius={50}
                  >
                    {categories.map((_, idx) => (
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
          <Card>
            <CardHeader>
              <CardTitle>Avg Response Time by Department (hrs)</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTime}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="hrs"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Heatmap of Most-Affected Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {heatData.map((h) => (
                <div
                  key={h.ward}
                  className="p-4 rounded-md border bg-gradient-to-r from-status-critical/10 via-status-warning/10 to-status-success/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{h.ward}</div>
                    <div className="text-sm text-muted-foreground">
                      {h.count} issues
                    </div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${Math.min(100, h.count * 5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trend (Demo)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { name: "Week 1", val: 12 },
                  { name: "Week 2", val: 18 },
                  { name: "Week 3", val: 15 },
                  { name: "Week 4", val: 22 },
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="val"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
