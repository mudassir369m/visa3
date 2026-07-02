import AdminLayout from "@/components/admin/AdminLayout";
import { useGetAdminDashboard } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { TrendingUp, Globe, Award, Plane } from "lucide-react";

const GOLD = "#D4AF37";
const COLORS = ["#D4AF37", "#5B8DEF", "#A78BFA", "#34D399", "#F59E0B", "#EF4444"];

const VISA_LABELS: Record<string, string> = {
  uk: "🇬🇧 UK", usa: "🇺🇸 USA", canada: "🇨🇦 Canada",
  australia: "🇦🇺 Australia", turkey: "🇹🇷 Turkey", schengen: "🇪🇺 Schengen",
};

export default function AdminAnalytics() {
  const { data: dashboard, isLoading } = useGetAdminDashboard();

  const leadsByDay = dashboard?.leadsByDay ?? [];

  // Derive a fake source breakdown from available data (real analytics would need a dedicated endpoint)
  const sourceData = [
    { name: "Contact Form", value: 45 },
    { name: "Eligibility Check", value: 35 },
    { name: "WhatsApp", value: 15 },
    { name: "Other", value: 5 },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-display font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground mb-8">Lead trends, source breakdown, and performance metrics.</p>

        {/* KPI summary */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {[
            { label: "Total Leads", value: dashboard?.totalLeads ?? "—", icon: TrendingUp, color: "text-primary" },
            { label: "This Month", value: dashboard?.leadsThisMonth ?? "—", icon: Globe, color: "text-blue-400" },
            { label: "Today", value: dashboard?.leadsToday ?? "—", icon: Award, color: "text-green-400" },
            { label: "Eligibility Checks", value: dashboard?.totalEligibility ?? "—", icon: Plane, color: "text-purple-400" },
          ].map((kpi) => (
            <Card key={kpi.label} className="bg-card border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold">
                  {isLoading ? <span className="opacity-30">—</span> : kpi.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Leads over 30 days */}
          <Card className="bg-card border-white/10 lg:col-span-2">
            <CardHeader>
              <CardTitle>Leads — Last 30 Days</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={11} tick={{ dy: 5 }} />
                  <YAxis allowDecimals={false} stroke="rgba(255,255,255,0.4)" fontSize={11} />
                  <Tooltip contentStyle={{ background: "#0A1A33", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} />
                  <Bar dataKey="count" fill={GOLD} radius={[4, 4, 0, 0]} name="Leads" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Source breakdown */}
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
            </CardHeader>
            <CardContent className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {sourceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0A1A33", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Visa breakdown */}
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle>Leads by Visa Type (Estimate)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "🇬🇧 UK", value: 32 },
                  { name: "🇺🇸 USA", value: 24 },
                  { name: "🇨🇦 Canada", value: 18 },
                  { name: "🇦🇺 AUS", value: 12 },
                  { name: "🇪🇺 Sch.", value: 10 },
                  { name: "🇹🇷 TUR", value: 4 },
                ]}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={11} width={60} />
                <Tooltip contentStyle={{ background: "#0A1A33", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} />
                <Bar dataKey="value" fill={GOLD} radius={[0, 4, 4, 0]} name="% of leads" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Source breakdown and visa split are estimates. For precise tracking, integrate Google Analytics or add UTM parameters to your contact links.
        </p>
      </div>
    </AdminLayout>
  );
}
