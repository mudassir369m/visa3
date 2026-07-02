import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useListEligibilitySubmissions, useUpdateEligibilityStatus, type EligibilitySubmission } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STATUSES = ["new", "contacted", "converted", "closed"];

function bandColor(band: string) {
  switch (band) {
    case "green": return "bg-green-500/20 text-green-400";
    case "yellow": return "bg-amber-500/20 text-amber-400";
    case "red": return "bg-red-500/20 text-red-400";
    default: return "bg-white/10 text-muted-foreground";
  }
}

export default function AdminEligibility() {
  const { toast } = useToast();
  const list = useListEligibilitySubmissions();
  const updateStatus = useUpdateEligibilityStatus();
  const [selected, setSelected] = useState<EligibilitySubmission | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const openRow = (row: EligibilitySubmission) => {
    setSelected(row);
    setStatus(row.status);
    setNotes(row.notes ?? "");
  };

  const save = () => {
    if (!selected) return;
    updateStatus.mutate(
      { id: selected.id, data: { status, notes } },
      {
        onSuccess: () => {
          toast({ title: "Submission updated" });
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
        <h1 className="text-3xl font-display font-bold mb-8">Eligibility Submissions</h1>
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Score</TableHead>
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
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No submissions yet.</TableCell>
                </TableRow>
              )}
              {(list.data ?? []).map((row) => (
                <TableRow key={row.id} className="cursor-pointer" onClick={() => openRow(row)}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.phone}<br />{row.email}</TableCell>
                  <TableCell className="uppercase">{row.destinationCountry}</TableCell>
                  <TableCell>
                    <Badge className={bandColor(row.band)} variant="secondary">{row.score}%</Badge>
                  </TableCell>
                  <TableCell className="capitalize">{row.status}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <a href={`https://wa.me/${row.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon"><MessageCircle className="w-4 h-4 text-green-500" /></Button>
                    </a>
                    <a href={`tel:${row.phone}`}>
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
            <DialogTitle>{selected?.name} — {selected?.destinationCountry.toUpperCase()}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <p>{selected.phone} · {selected.email}</p>
              <p><strong>Purpose:</strong> {selected.visaPurpose}</p>
              <p><strong>Age:</strong> {selected.ageRange ?? "—"} · <strong>Marital:</strong> {selected.maritalStatus ?? "—"}</p>
              <p><strong>Employment:</strong> {selected.employmentStatus ?? "—"}</p>
              <p><strong>Income:</strong> {selected.monthlyIncome ?? "—"} · <strong>Balance:</strong> {selected.bankBalance ?? "—"}</p>
              <p><strong>Property:</strong> {selected.propertyOwnership ? "Yes" : "No"} · <strong>Prior Refusal:</strong> {selected.previousRefusals ? "Yes" : "No"}</p>
              <p><strong>Score:</strong> {selected.score}% ({selected.band})</p>
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
            <Button onClick={save} disabled={updateStatus.isPending} className="gold-gradient-bg text-black font-semibold">
              {updateStatus.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
