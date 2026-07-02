import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, TrendingUp, Bell } from "lucide-react";

export default function AdminNewsletter() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-display font-bold mb-2">Newsletter Subscribers</h1>
        <p className="text-muted-foreground mb-8">Manage email subscribers who signed up for embassy updates.</p>

        {/* KPI cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[
            { label: "Total Subscribers", value: "—", icon: Users, note: "Requires database query" },
            { label: "Active Subscribers", value: "—", icon: Mail, note: "Opted-in" },
            { label: "Unsubscribed", value: "—", icon: TrendingUp, note: "Opted-out" },
          ].map((kpi) => (
            <Card key={kpi.label} className="bg-card border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                <kpi.icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold mb-1">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">{kpi.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info panel */}
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Newsletter Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Newsletter subscriptions are collected from the homepage signup form and stored in the <code className="bg-white/10 px-1 rounded">newsletter_subscribers</code> table in the database.
            </p>
            <p>
              To export subscribers or send a campaign, connect a dedicated email marketing service (e.g. Resend Broadcasts, Mailchimp, or SendGrid) to the <code className="bg-white/10 px-1 rounded">RESEND_API_KEY</code> environment variable.
            </p>
            <div className="border border-white/10 rounded-xl p-4 bg-white/3">
              <p className="font-semibold text-foreground mb-2">How subscriber collection works:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Visitor enters email in the homepage newsletter box</li>
                <li>POST /api/newsletter saves the email to the database</li>
                <li>Admin notification email is sent via Resend (if configured)</li>
                <li>Subscriber is stored with <code className="bg-white/10 px-1 rounded">isActive: true</code></li>
              </ul>
            </div>
            <p>
              To view raw subscriber data, query the database directly:<br />
              <code className="bg-white/10 px-2 py-1 rounded block mt-2">SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC;</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
