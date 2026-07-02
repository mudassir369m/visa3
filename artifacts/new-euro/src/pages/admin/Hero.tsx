import AdminLayout from "@/components/admin/AdminLayout";
import CrudPage, { FieldConfig, ColumnConfig } from "@/components/admin/CrudPage";
import { useListHeroSlides, useCreateHeroSlide, useUpdateHeroSlide, useDeleteHeroSlide, type HeroSlide } from "@workspace/api-client-react";

const fields: FieldConfig[] = [
  { name: "headline", label: "Headline", type: "text" },
  { name: "subhead", label: "Subhead", type: "textarea" },
  { name: "primaryCta", label: "Primary CTA Text", type: "text" },
  { name: "primaryCtaLink", label: "Primary CTA Link", type: "text", placeholder: "/eligibility-check" },
  { name: "secondaryCta", label: "Secondary CTA Text", type: "text", required: false },
  { name: "secondaryCtaLink", label: "Secondary CTA Link", type: "text", required: false },
  { name: "mediaUrl", label: "Media URL", type: "text", placeholder: "https://...", required: false },
  { name: "mediaType", label: "Media Type", type: "text", placeholder: "photo | video", required: false },
  { name: "active", label: "Active", type: "boolean" },
  { name: "sortOrder", label: "Sort Order", type: "number" },
];

const columns: ColumnConfig<HeroSlide>[] = [
  { key: "headline", label: "Headline" },
  { key: "primaryCta", label: "Primary CTA" },
  { key: "active", label: "Active", render: (r) => (r.active ? "Yes" : "No") },
];

export default function AdminHero() {
  const list = useListHeroSlides();
  const createMutation = useCreateHeroSlide();
  const updateMutation = useUpdateHeroSlide();
  const deleteMutation = useDeleteHeroSlide();

  return (
    <AdminLayout>
      <CrudPage<HeroSlide>
        title="Hero Slides"
        description="Manage the homepage hero headline, subhead, and CTAs. Note: the 3D Earth background is fixed and not admin-editable."
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
