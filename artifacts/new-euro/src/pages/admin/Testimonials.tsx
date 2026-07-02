import AdminLayout from "@/components/admin/AdminLayout";
import CrudPage, { FieldConfig, ColumnConfig } from "@/components/admin/CrudPage";
import { useListTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial, type Testimonial } from "@workspace/api-client-react";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "visaType", label: "Visa Type", type: "text" },
  { name: "message", label: "Message", type: "textarea" },
  { name: "rating", label: "Rating (1-5)", type: "number" },
  { name: "status", label: "Status", type: "text", placeholder: "published | pending", defaultValue: "published", required: false },
];

const columns: ColumnConfig<Testimonial>[] = [
  { key: "name", label: "Name" },
  { key: "country", label: "Country" },
  { key: "rating", label: "Rating", render: (r) => "★".repeat(r.rating) },
  { key: "status", label: "Status" },
];

export default function AdminTestimonials() {
  const list = useListTestimonials();
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  return (
    <AdminLayout>
      <CrudPage<Testimonial>
        title="Testimonials"
        description="Manage client reviews shown in the Success Stories section."
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
