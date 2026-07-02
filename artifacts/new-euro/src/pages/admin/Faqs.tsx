import AdminLayout from "@/components/admin/AdminLayout";
import CrudPage, { FieldConfig, ColumnConfig } from "@/components/admin/CrudPage";
import { useListFaqs, useCreateFaq, useUpdateFaq, useDeleteFaq, type Faq } from "@workspace/api-client-react";

const fields: FieldConfig[] = [
  { name: "question", label: "Question", type: "text" },
  { name: "answer", label: "Answer", type: "textarea" },
  { name: "category", label: "Category", type: "text", required: false },
  { name: "sortOrder", label: "Sort Order", type: "number" },
];

const columns: ColumnConfig<Faq>[] = [
  { key: "question", label: "Question" },
  { key: "category", label: "Category" },
  { key: "sortOrder", label: "Sort Order" },
];

export default function AdminFaqs() {
  const list = useListFaqs();
  const createMutation = useCreateFaq();
  const updateMutation = useUpdateFaq();
  const deleteMutation = useDeleteFaq();

  return (
    <AdminLayout>
      <CrudPage<Faq>
        title="FAQs"
        description="Manage the frequently asked questions shown on the homepage and FAQ page."
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
