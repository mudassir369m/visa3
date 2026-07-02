import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminLayout from "@/components/admin/AdminLayout";
import { useGetSiteSettings, useUpdateSiteSettings, type SiteSettingsUpdate } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const FIELDS: { name: keyof SiteSettingsUpdate; label: string; type: "text" | "textarea" | "number" }[] = [
  { name: "businessName", label: "Business Name", type: "text" },
  { name: "tagline", label: "Tagline", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "whatsapp", label: "WhatsApp Number (digits only)", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "address", label: "Office Address", type: "textarea" },
  { name: "hours", label: "Office Hours", type: "text" },
  { name: "announcementBar", label: "Announcement Bar Text", type: "textarea" },
  { name: "instagramHandle", label: "Instagram Handle", type: "text" },
  { name: "instagramHandle2", label: "Instagram Handle 2", type: "text" },
  { name: "tiktokHandle", label: "TikTok Handle", type: "text" },
  { name: "facebookHandle", label: "Facebook Handle", type: "text" },
  { name: "youtubeHandle", label: "YouTube Handle", type: "text" },
  { name: "yearsExperience", label: "Years of Experience", type: "number" },
  { name: "visasProcessed", label: "Visas Processed", type: "number" },
  { name: "successRate", label: "Success Rate (e.g. 99%)", type: "text" },
  { name: "countriesCovered", label: "Countries Covered", type: "number" },
];

export default function AdminSettings() {
  const { toast } = useToast();
  const { data: settings, isLoading } = useGetSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const form = useForm<Record<string, string | number>>({ defaultValues: {} });

  useEffect(() => {
    if (settings) form.reset(settings as unknown as Record<string, string | number>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const onSubmit = (values: Record<string, string | number>) => {
    updateSettings.mutate(
      { data: values as SiteSettingsUpdate },
      {
        onSuccess: () => toast({ title: "Settings saved" }),
        onError: () => toast({ title: "Save failed", variant: "destructive" }),
      }
    );
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-8 text-muted-foreground">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-3xl">
        <h1 className="text-3xl font-display font-bold mb-8">Site Settings</h1>
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle>General, Contact & Social</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {FIELDS.map((f) => (
                <div key={f.name} className="space-y-2">
                  <Label>{f.label}</Label>
                  {f.type === "textarea" ? (
                    <Textarea rows={3} {...form.register(f.name)} />
                  ) : (
                    <Input type={f.type === "number" ? "number" : "text"} {...form.register(f.name, f.type === "number" ? { valueAsNumber: true } : {})} />
                  )}
                </div>
              ))}
              <Button type="submit" disabled={updateSettings.isPending} className="gold-gradient-bg text-black font-semibold">
                {updateSettings.isPending ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
