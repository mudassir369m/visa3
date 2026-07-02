import AdminLayout from "@/components/admin/AdminLayout";
import CrudPage, { FieldConfig, ColumnConfig } from "@/components/admin/CrudPage";
import { useListTours, useCreateTour, useUpdateTour, useDeleteTour, type Tour } from "@workspace/api-client-react";

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "slug", label: "Slug", type: "text", placeholder: "europe-explorer" },
  { name: "category", label: "Category", type: "text", placeholder: "Europe" },
  { name: "description", label: "Description", type: "textarea", required: false },
  { name: "days", label: "Days", type: "number" },
  { name: "nights", label: "Nights", type: "number" },
  { name: "price", label: "Price (PKR)", type: "text" },
  { name: "originalPrice", label: "Original Price (PKR)", type: "text", required: false },
  { name: "inclusions", label: "Inclusions", type: "stringArray", placeholder: "One per line" },
  { name: "sortOrder", label: "Sort Order", type: "number" },
  { name: "published", label: "Published", type: "boolean" },
];

const columns: ColumnConfig<Tour>[] = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", render: (r) => `PKR ${r.price}` },
  { key: "published", label: "Published", render: (r) => (r.published ? "Yes" : "No") },
];

export default function AdminTours() {
  const list = useListTours();
  const createMutation = useCreateTour();
  const updateMutation = useUpdateTour();
  const deleteMutation = useDeleteTour();

  return (
    <AdminLayout>
      <CrudPage<Tour>
        title="Tours"
        description="Manage tour packages shown in the homepage carousel and tours page."
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
