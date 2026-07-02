import AdminLayout from "@/components/admin/AdminLayout";
import CrudPage, { FieldConfig, ColumnConfig } from "@/components/admin/CrudPage";
import { useListServices, useCreateService, useUpdateService, useDeleteService, type Service } from "@workspace/api-client-react";

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "slug", label: "Slug", type: "text", placeholder: "air-ticketing" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "icon", label: "Icon (Lucide name)", type: "text", placeholder: "PlaneTakeoff" },
  { name: "sortOrder", label: "Sort Order", type: "number" },
  { name: "published", label: "Published", type: "boolean" },
];

const columns: ColumnConfig<Service>[] = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "icon", label: "Icon" },
  { key: "published", label: "Published", render: (r) => (r.published ? "Yes" : "No") },
];

export default function AdminServices() {
  const list = useListServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  return (
    <AdminLayout>
      <CrudPage<Service>
        title="Services"
        description="Manage the cross-sell services shown on the homepage."
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
