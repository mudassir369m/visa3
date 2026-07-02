import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useListLeads, useUpdateLead, type Lead } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STATUSES = ["new", "contacted", "converted", "closed"];

function statusColor(status: string) {
  switch (status) {
    case "new": return "bg-blue-500/20 text-blue-400";
    case "contacted": return "bg-amber-500/20 text-amber-400";
    case "converted": return "bg-green-500/20 text-green-400";
    case "closed": return "bg-white/10 text-muted-foreground";
    default: return "bg-white/10 text-muted-foreground";
  }
}

export default function AdminLeads() {
  const { toast } = useToast();
  const list = useListLeads();
  const updateLead = useUpdateLead();
  const [selected, setSelected] = useState<Lead | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const openLead = (lead: Lead) => {
    setSelected(lead);
    setStatus(lead.status);
    setNotes(lead.notes ?? "");
  };

  const save = () => {
    if (!selected) return;
    updateLead.mutate(
      { id: selected.id, data: { status, notes } },
      {
        onSuccess: () => {
          toast({ title: "Lead updated" });
          setSelected(null);
          list.refetch();
        },
        onError: () => toast({ title: "Update failed", variant: "destructive" }),
      }
    );
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-display font-bold mb-8">Leads</h1>
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading...</TableCell>
                </TableRow>
              )}
              {!list.isLoading && (list.data ?? []).length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No leads yet.</TableCell>
                </TableRow>
              )}
              {(list.data ?? []).map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer" onClick={() => openLead(lead)}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{lead.phone}<br />{lead.email}</TableCell>
                  <TableCell>{lead.subject}</TableCell>
                  <TableCell className="capitalize">{lead.source ?? "—"}</TableCell>
                  <TableCell>
                    <Badge className={statusColor(lead.status)} variant="secondary">{lead.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon"><MessageCircle className="w-4 h-4 text-green-500" /></Button>
                    </a>
                    <a href={`tel:${lead.phone}`}>
                      <Button variant="ghost" size="icon"><Phone className="w-4 h-4 text-primary" /></Button>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{selected.phone} · {selected.email}</p>
              <p className="text-sm"><strong>Subject:</strong> {selected.subject}</p>
              <p className="text-sm"><strong>Message:</strong> {selected.message}</p>
              {selected.visaCountry && <p className="text-sm"><strong>Visa Country:</strong> {selected.visaCountry}</p>}
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={save} disabled={updateLead.isPending} className="gold-gradient-bg text-black font-semibold">
              {updateLead.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
