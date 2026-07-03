import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Users } from "lucide-react";

export default function AdminTeam() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { toast } = useToast();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, role, bio, photoUrl: photoUrl || undefined, sortOrder: 0, isPublished: true }),
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Team member added", description: `${name} added to the team.` });
      setOpen(false);
      setName(""); setRole(""); setBio(""); setPhotoUrl("");
    } catch {
      toast({ title: "Error", description: "Could not add team member.", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Team Members</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage the New Euro team — displayed on the About page</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gold-gradient-bg text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" /> Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="S. Mustafa" required />
                </div>
                <div className="space-y-2">
                  <Label>Role / Title</Label>
                  <Input value={role} onChange={e => setRole(e.target.value)} placeholder="CEO & Founder" required />
                </div>
                <div className="space-y-2">
                  <Label>Bio (optional)</Label>
                  <Textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="18 years of experience in visa consultancy..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Photo URL (optional)</Label>
                  <Input value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} placeholder="https://..." />
                </div>
                <Button type="submit" className="w-full gold-gradient-bg text-black font-semibold">Add Member</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Seed data suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6 border-white/5"
        >
          <p className="font-semibold mb-3">Suggested Team Members</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: "S. Mustafa", role: "CEO & Founder", note: "18 years experience, @worldofmustafa" },
              { name: "Visa Processing Team", role: "Document Specialists", note: "UK, USA, Canada, Australia experts" },
              { name: "Client Relations", role: "Client Support", note: "Mon–Fri 9AM–4PM" },
              { name: "Tours Division", role: "Travel Consultants", note: "Umrah, Europe, Asia packages" },
            ].map((m, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-sm font-bold text-primary">
                  {m.name[0]}
                </div>
                <div>
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="text-xs text-primary">{m.role}</p>
                  <p className="text-xs text-muted-foreground">{m.note}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Empty state */}
        <div className="glass-card rounded-2xl p-16 border-white/5 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-primary/50" />
          </div>
          <p className="font-display font-bold text-lg mb-2">No team members yet</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Add team members using the button above. They will appear on the About page.
          </p>
          <Button onClick={() => setOpen(true)} className="gold-gradient-bg text-black font-semibold">
            <Plus className="w-4 h-4 mr-2" /> Add First Member
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
