import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Image, RefreshCw } from "lucide-react";
import {
  useListGalleryAdmin,
  useCreateGalleryItem,
  useDeleteGalleryItem,
  getListGalleryAdminQueryKey,
  type GalleryItem,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const CATEGORIES = ["office", "team", "events", "embassy"] as const;
type Category = typeof CATEGORIES[number];

export default function AdminGallery() {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<Category>("office");
  const [activeFilter, setActiveFilter] = useState<"All" | Category>("All");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useListGalleryAdmin();
  const createMutation = useCreateGalleryItem({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListGalleryAdminQueryKey() });
        toast({ title: "Photo added", description: `${caption} added to gallery.` });
        setOpen(false);
        setImageUrl(""); setCaption(""); setCategory("office");
      },
      onError: () => toast({ title: "Error", description: "Could not add photo.", variant: "destructive" }),
    },
  });
  const deleteMutation = useDeleteGalleryItem({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListGalleryAdminQueryKey() }),
      onError: () => toast({ title: "Error", description: "Could not delete photo.", variant: "destructive" }),
    },
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ data: { imageUrl, caption, category, sortOrder: 0, isPublished: true } });
  };

  const filtered = activeFilter === "All" ? items : items.filter((g: GalleryItem) => g.category === activeFilter);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Gallery</h1>
            <p className="text-sm text-muted-foreground mt-1">Office photos, team shots, embassy visits</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gold-gradient-bg text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" /> Add Photo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Gallery Photo</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." required />
                  <p className="text-xs text-muted-foreground">Paste a direct image URL (JPG, PNG, WebP).</p>
                </div>
                <div className="space-y-2">
                  <Label>Caption</Label>
                  <Input value={caption} onChange={e => setCaption(e.target.value)} placeholder="F-11 Office Interior" required />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={v => setCategory(v as Category)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={createMutation.isPending} className="w-full gold-gradient-bg text-black font-semibold">
                  {createMutation.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
                  Add Photo
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6 border-white/5 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Image className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold mb-1">Gallery Management</p>
            <p className="text-sm text-muted-foreground">
              Add photos using direct image URLs. Categories: <strong>Office</strong>, <strong>Team</strong>, <strong>Events</strong>, <strong>Embassy</strong>. Photos appear on the public /gallery page once published.
            </p>
          </div>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {(["All", ...CATEGORIES.map(c => c.charAt(0).toUpperCase() + c.slice(1))] as string[]).map(cat => (
            <Badge
              key={cat}
              variant={activeFilter === cat || (cat === "All" && activeFilter === "All") ? "default" : "outline"}
              className="cursor-pointer border-white/10 hover:border-primary/50 hover:text-primary transition-colors"
              onClick={() => setActiveFilter(cat === "All" ? "All" : cat.toLowerCase() as Category)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Grid or empty state */}
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-16 border-white/5 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Image className="w-10 h-10 text-primary/50" />
            </div>
            <p className="font-display font-bold text-lg mb-2">No photos yet</p>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Add your first gallery photo using the button above.
            </p>
            <Button onClick={() => setOpen(true)} className="gold-gradient-bg text-black font-semibold">
              <Plus className="w-4 h-4 mr-2" /> Add First Photo
            </Button>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item: GalleryItem) => (
              <div key={item.id} className="break-inside-avoid rounded-xl overflow-hidden border border-white/5 group relative">
                <img src={item.imageUrl} alt={item.caption} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-xs font-medium text-white mb-1">{item.caption}</p>
                  <Badge variant="outline" className="self-start text-xs border-white/20 text-white/70 mb-2">{item.category}</Badge>
                  <Button
                    size="sm" variant="destructive"
                    className="h-7 text-xs w-full"
                    onClick={() => deleteMutation.mutate({ id: item.id })}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-3 h-3 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
