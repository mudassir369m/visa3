import AdminLayout from "@/components/admin/AdminLayout";
import CrudPage, { FieldConfig, ColumnConfig } from "@/components/admin/CrudPage";
import { useListVisas, useCreateVisa, useUpdateVisa, useDeleteVisa, type Visa } from "@workspace/api-client-react";

const fields: FieldConfig[] = [
  { name: "country", label: "Country", type: "text" },
  { name: "slug", label: "Slug", type: "text", placeholder: "uk" },
  { name: "flag", label: "Flag Emoji", type: "text", placeholder: "🇬🇧" },
  { name: "headline", label: "Headline", type: "text" },
  { name: "description", label: "Description", type: "textarea", required: false },
  { name: "visaTypes", label: "Visa Types", type: "stringArray", placeholder: "One per line" },
  { name: "processingDays", label: "Processing Days", type: "text", placeholder: "15 - 20 Days" },
  { name: "successRate", label: "Success Rate", type: "text", placeholder: "98%" },
  { name: "requirements", label: "Requirements", type: "stringArray", placeholder: "One per line" },
  { name: "documents", label: "Documents", type: "stringArray", placeholder: "One per line" },
  { name: "fees", label: "Fees", type: "text", required: false },
  { name: "sortOrder", label: "Sort Order", type: "number" },
  { name: "published", label: "Published", type: "boolean" },
];

const columns: ColumnConfig<Visa>[] = [
  { key: "flag", label: "" },
  { key: "country", label: "Country" },
  { key: "slug", label: "Slug" },
  { key: "successRate", label: "Success Rate" },
  { key: "published", label: "Published", render: (r) => (r.published ? "Yes" : "No") },
];

export default function AdminVisas() {
  const list = useListVisas();
  const createMutation = useCreateVisa();
  const updateMutation = useUpdateVisa();
  const deleteMutation = useDeleteVisa();

  return (
    <AdminLayout>
      <CrudPage<Visa>
        title="Visas"
        description="Manage per-country visa destinations shown on the homepage and visa pages."
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
