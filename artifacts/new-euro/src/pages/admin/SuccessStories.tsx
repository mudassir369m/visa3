import AdminLayout from "@/components/admin/AdminLayout";
import CrudPage, { FieldConfig, ColumnConfig } from "@/components/admin/CrudPage";
import { useListTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial, type Testimonial } from "@workspace/api-client-react";

// Success stories are stored as high-rating testimonials with an optional video URL
const fields: FieldConfig[] = [
  { name: "name", label: "Client Name", type: "text" },
  { name: "country", label: "Visa Country", type: "text", placeholder: "UK, USA, Canada..." },
  { name: "visaType", label: "Visa Type", type: "text", placeholder: "Tourist, Business, Family..." },
  { name: "message", label: "Their Story / Quote", type: "textarea" },
  { name: "rating", label: "Rating (1–5)", type: "number", defaultValue: 5 },
  { name: "videoUrl", label: "Video URL (optional)", type: "text", placeholder: "https://youtube.com/... or TikTok URL", required: false },
  { name: "status", label: "Status", type: "text", placeholder: "published | pending", defaultValue: "published", required: false },
];

const columns: ColumnConfig<Testimonial>[] = [
  { key: "name", label: "Client" },
  { key: "country", label: "Country" },
  { key: "visaType", label: "Visa" },
  { key: "rating", label: "Rating", render: (r) => "★".repeat(Math.min(r.rating, 5)) },
  { key: "videoUrl", label: "Has Video", render: (r) => (r.videoUrl ? "✓" : "—") },
  { key: "status", label: "Status" },
];

export default function AdminSuccessStories() {
  const list = useListTestimonials();
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  return (
    <AdminLayout>
      <CrudPage<Testimonial>
        title="Success Stories"
        description="Manage client success stories shown on the Success Stories page and home section. Add a Video URL for video testimonials."
        fields={fields}
        columns={columns}
        list={{ data: list.data, isLoading: list.isLoading, refetch: list.refetch }}
        createMutation={createMutation}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
        getId={(row) => row.id}
      />
    </AdminLayout>
  );
}
