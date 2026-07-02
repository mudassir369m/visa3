import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useListAdminUsers, useCreateAdminUser } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { UserPlus, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateUserForm {
  email: string;
  password: string;
  name: string;
}

export default function AdminUsers() {
  const { toast } = useToast();
  const { data: users, isLoading, refetch } = useListAdminUsers();
  const createUser = useCreateAdminUser();
  const [open, setOpen] = useState(false);
  const form = useForm<CreateUserForm>();

  const onSubmit = (values: CreateUserForm) => {
    createUser.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({ title: "Admin user created" });
          setOpen(false);
          form.reset();
          refetch();
        },
        onError: () => {
          toast({ title: "Failed to create user", variant: "destructive" });
        },
      }
    );
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Admin Users</h1>
            <p className="text-muted-foreground">Manage who has access to this admin panel.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gold-gradient-bg text-black font-semibold">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10">
              <DialogHeader>
                <DialogTitle>Create Admin User</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="e.g. S. Mustafa" {...form.register("name", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="admin@neweuroconsultants.com" {...form.register("email", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="Strong password (min 8 chars)" {...form.register("password", { required: true, minLength: 8 })} />
                </div>
                <Button type="submit" disabled={createUser.isPending} className="w-full gold-gradient-bg text-black font-semibold">
                  {createUser.isPending ? "Creating..." : "Create Admin User"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Active Admin Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />
                ))}
              </div>
            )}

            {!isLoading && (!users || users.length === 0) && (
              <div className="text-center py-12 text-muted-foreground">
                <ShieldCheck className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p>No admin users found.</p>
              </div>
            )}

            <div className="space-y-3">
              {(users ?? []).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gold-gradient-bg flex items-center justify-center font-display font-bold text-black text-sm">
                      {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{user.name ?? "Admin"}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-primary/40 text-primary text-[10px]">
                      admin
                    </Badge>
                    {user.createdAt && (
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        Joined {new Date(user.createdAt).toLocaleDateString("en-PK", { month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-6 p-4 border border-white/5 rounded-xl bg-white/3">
              <strong>Security note:</strong> To change your own password, log out and use the password reset flow, or contact the system owner. Admin accounts cannot be deleted from this panel to prevent accidental lockout — use the database directly if needed.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
