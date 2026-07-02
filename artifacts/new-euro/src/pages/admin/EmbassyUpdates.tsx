import AdminLayout from "@/components/admin/AdminLayout";
import CrudPage, { FieldConfig, ColumnConfig } from "@/components/admin/CrudPage";
import { useListEmbassyUpdates, useCreateEmbassyUpdate, useUpdateEmbassyUpdate, useDeleteEmbassyUpdate, type EmbassyUpdate } from "@workspace/api-client-react";

const fields: FieldConfig[] = [
  { name: "country", label: "Country", type: "text" },
  { name: "flag", label: "Flag Emoji", type: "text", placeholder: "🇬🇧" },
  { name: "headline", label: "Headline", type: "text" },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "content", label: "Full Content", type: "textarea", required: false },
];

const columns: ColumnConfig<EmbassyUpdate>[] = [
  { key: "flag", label: "" },
  { key: "country", label: "Country" },
  { key: "headline", label: "Headline" },
  { key: "publishedAt", label: "Published", render: (r) => new Date(r.publishedAt).toLocaleDateString() },
];

export default function AdminEmbassyUpdates() {
  const list = useListEmbassyUpdates();
  const createMutation = useCreateEmbassyUpdate();
  const updateMutation = useUpdateEmbassyUpdate();
  const deleteMutation = useDeleteEmbassyUpdate();

  return (
    <AdminLayout>
      <CrudPage<EmbassyUpdate>
        title="Embassy Updates"
        description="Manage embassy policy update articles shown on the homepage."
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
