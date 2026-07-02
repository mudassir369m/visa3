import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "stringArray" | "datetime";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: unknown;
  /** Defaults to true for text/textarea/number fields. Set false for optional schema fields. */
  required?: boolean;
}

export interface ColumnConfig<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

// The generated hooks are typed against each entity's specific *Input shape
// (e.g. VisaInput), but this component builds payloads dynamically from a
// runtime field config, so the exact shape can't be statically verified per
// entity. `vars` is intentionally `any` only at this adapter seam.
interface MutationLike {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: (vars: any, opts?: { onSuccess?: () => void; onError?: () => void }) => void;
  isPending: boolean;
}

interface CrudPageProps<T> {
  title: string;
  description?: string;
  fields: FieldConfig[];
  columns: ColumnConfig<T>[];
  list: { data: T[] | undefined; isLoading: boolean; refetch: () => void };
  createMutation: MutationLike;
  updateMutation: MutationLike;
  deleteMutation: MutationLike;
  getId: (row: T) => number;
  emptyValues?: Record<string, unknown>;
}

function fieldToDefault(field: FieldConfig): unknown {
  if (field.defaultValue !== undefined) return field.defaultValue;
  switch (field.type) {
    case "boolean":
      return true;
    case "number":
      return 0;
    case "stringArray":
      return "";
    default:
      return "";
  }
}

function rowToFormValues(row: Record<string, unknown> | null, fields: FieldConfig[]): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const f of fields) {
    const raw = row?.[f.name];
    if (f.type === "stringArray") {
      values[f.name] = Array.isArray(raw) ? raw.join("\n") : "";
    } else if (f.type === "boolean") {
      values[f.name] = typeof raw === "boolean" ? raw : (f.defaultValue ?? true);
    } else if (raw === null || raw === undefined) {
      values[f.name] = fieldToDefault(f);
    } else {
      values[f.name] = raw;
    }
  }
  return values;
}

function formValuesToPayload(values: Record<string, unknown>, fields: FieldConfig[]): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const f of fields) {
    const v = values[f.name];
    if (f.type === "stringArray") {
      payload[f.name] = String(v ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (f.type === "number") {
      payload[f.name] = Number(v ?? 0);
    } else {
      payload[f.name] = v;
    }
  }
  return payload;
}

export default function CrudPage<T>({
  title,
  description,
  fields,
  columns,
  list,
  createMutation,
  updateMutation,
  deleteMutation,
  getId,
}: CrudPageProps<T>) {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);

  const form = useForm<Record<string, unknown>>({
    defaultValues: rowToFormValues(null, fields),
  });

  useEffect(() => {
    if (dialogOpen) {
      form.reset(rowToFormValues(editing as Record<string, unknown> | null, fields));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen, editing]);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (row: T) => {
    setEditing(row);
    setDialogOpen(true);
  };

  const onSubmit = (values: Record<string, unknown>) => {
    const payload = formValuesToPayload(values, fields);
    if (editing) {
      updateMutation.mutate(
        { id: getId(editing), data: payload },
        {
          onSuccess: () => {
            toast({ title: `${title.slice(0, -1)} updated` });
            setDialogOpen(false);
            list.refetch();
          },
          onError: () => toast({ title: "Update failed", variant: "destructive" }),
        }
      );
    } else {
      createMutation.mutate(
        { data: payload },
        {
          onSuccess: () => {
            toast({ title: `${title.slice(0, -1)} created` });
            setDialogOpen(false);
            list.refetch();
          },
          onError: () => toast({ title: "Create failed", variant: "destructive" }),
        }
      );
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(
      { id: getId(deleteTarget) },
      {
        onSuccess: () => {
          toast({ title: "Deleted" });
          setDeleteTarget(null);
          list.refetch();
        },
        onError: () => toast({ title: "Delete failed", variant: "destructive" }),
      }
    );
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        <Button onClick={openCreate} className="gold-gradient-bg text-black font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c.key}>{c.label}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.isLoading && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {!list.isLoading && (list.data ?? []).length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                  No entries yet.
                </TableCell>
              </TableRow>
            )}
            {(list.data ?? []).map((row) => (
              <TableRow key={getId(row)}>
                {columns.map((c) => (
                  <TableCell key={c.key}>
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "")}
                  </TableCell>
                ))}
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(row)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((f) => (
              <div key={f.name} className="space-y-2">
                {f.type !== "boolean" && <Label>{f.label}</Label>}
                {f.type === "text" && <Input placeholder={f.placeholder} {...form.register(f.name, { required: f.required ?? true })} />}
                {f.type === "number" && (
                  <Input type="number" placeholder={f.placeholder} {...form.register(f.name, { required: f.required ?? true, valueAsNumber: true })} />
                )}
                {f.type === "textarea" && (
                  <Textarea placeholder={f.placeholder} rows={4} {...form.register(f.name, { required: f.required ?? true })} />
                )}
                {f.type === "stringArray" && (
                  <Textarea
                    placeholder={f.placeholder ?? "One item per line"}
                    rows={4}
                    {...form.register(f.name)}
                  />
                )}
                {f.type === "datetime" && <Input type="datetime-local" {...form.register(f.name)} />}
                {f.type === "boolean" && (
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={!!form.watch(f.name)}
                      onCheckedChange={(v) => form.setValue(f.name, v)}
                    />
                    <Label>{f.label}</Label>
                  </div>
                )}
              </div>
            ))}
            <DialogFooter>
              <Button type="submit" disabled={isSaving} className="gold-gradient-bg text-black font-semibold">
                {isSaving ? "Saving..." : editing ? "Save Changes" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
