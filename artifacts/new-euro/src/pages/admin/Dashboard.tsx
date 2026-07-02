import { useGetAdminDashboard } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AdminLayout from "@/components/admin/AdminLayout";
import { Users, CalendarDays, TrendingUp, ClipboardCheck } from "lucide-react";

function statusColor(status: string) {
  switch (status) {
    case "new": return "bg-blue-500/20 text-blue-400";
    case "contacted": return "bg-amber-500/20 text-amber-400";
    case "converted": return "bg-green-500/20 text-green-400";
    default: return "bg-white/10 text-muted-foreground";
  }
}

export default function AdminDashboard() {
  const { data: dashboard, isLoading } = useGetAdminDashboard();

  const kpis = [
    { label: "Leads Today", value: dashboard?.leadsToday ?? 0, icon: CalendarDays },
    { label: "Leads This Month", value: dashboard?.leadsThisMonth ?? 0, icon: TrendingUp },
    { label: "Total Leads", value: dashboard?.totalLeads ?? 0, icon: Users },
    { label: "Eligibility Checks", value: dashboard?.totalEligibility ?? 0, icon: ClipboardCheck },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-display font-bold mb-8">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="bg-card border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                <kpi.icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold">{isLoading ? "—" : kpi.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-white/10 mb-8">
          <CardHeader>
            <CardTitle>Leads — Last 30 Days</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboard?.leadsByDay ?? []}>
                <defs>
                  <linearGradient id="leadsGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <YAxis allowDecimals={false} stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <Tooltip contentStyle={{ background: "#0A1A33", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Area type="monotone" dataKey="count" stroke="#D4AF37" fill="url(#leadsGold)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(dashboard?.recentLeads ?? []).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">No leads yet.</TableCell>
                  </TableRow>
                )}
                {(dashboard?.recentLeads ?? []).map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.subject}</TableCell>
                    <TableCell><Badge className={statusColor(lead.status)} variant="secondary">{lead.status}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
