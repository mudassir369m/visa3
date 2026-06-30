import { useGetMe, useGetAdminDashboard } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { data: user, isError, isLoading: userLoading } = useGetMe();
  const { data: dashboard, isLoading: dashLoading } = useGetAdminDashboard({ query: { enabled: !!user } });

  useEffect(() => {
    if (isError) {
      setLocation("/admin/login");
    }
  }, [isError, setLocation]);

  if (userLoading || dashLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard?.totalLeads || 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
