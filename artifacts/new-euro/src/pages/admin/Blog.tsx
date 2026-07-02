import AdminLayout from "@/components/admin/AdminLayout";
import CrudPage, { FieldConfig, ColumnConfig } from "@/components/admin/CrudPage";
import { useListBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost, type BlogPost } from "@workspace/api-client-react";

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "slug", label: "Slug", type: "text" },
  { name: "excerpt", label: "Excerpt", type: "textarea" },
  { name: "content", label: "Content", type: "textarea" },
  { name: "category", label: "Category", type: "text", placeholder: "Guide | Tips" },
  { name: "readTime", label: "Read Time", type: "text", placeholder: "5 min read" },
  { name: "published", label: "Published", type: "boolean" },
];

const columns: ColumnConfig<BlogPost>[] = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "readTime", label: "Read Time" },
  { key: "published", label: "Published", render: (r) => (r.published ? "Yes" : "No") },
];

export default function AdminBlog() {
  const list = useListBlogPosts();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();

  return (
    <AdminLayout>
      <CrudPage<BlogPost>
        title="Blog Posts"
        description="Manage blog articles shown on the homepage and blog page."
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
