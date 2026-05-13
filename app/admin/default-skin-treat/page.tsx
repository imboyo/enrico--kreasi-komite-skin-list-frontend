import type { Metadata } from "next";

import { PageDefaultSkinTreat } from "@/client-side-page/admin/default-skin-treat/PageDefaultSkinTreat";
import {
  DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_CATEGORY,
  isAdminDefaultSkinTreatCategoryId,
  type AdminDefaultSkinTreatCategoryId,
} from "@/client-side-page/admin/default-skin-treat/utils/defaultSkinTreatCategory";

export const metadata: Metadata = {
  title: "Default Skin Treat Management",
};

interface AdminDefaultSkinTreatsPageProps {
  searchParams: Promise<{
    category?: string | string[];
  }>;
}

function resolveActiveCategory(
  categoryValue: string | string[] | undefined,
): AdminDefaultSkinTreatCategoryId {
  const normalizedCategoryValue = Array.isArray(categoryValue)
    ? categoryValue[0]
    : categoryValue;

  // The route owns the canonical fallback so invalid query strings do not leak
  // unsupported categories into the client page contract.
  return isAdminDefaultSkinTreatCategoryId(normalizedCategoryValue)
    ? normalizedCategoryValue
    : DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_CATEGORY;
}

export default async function AdminDefaultSkinTreatsPage({
  searchParams,
}: Readonly<AdminDefaultSkinTreatsPageProps>) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolveActiveCategory(resolvedSearchParams.category);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-4 py-4 lg:px-8 lg:py-6">
      {/* Section: Default skin treat page title */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Manajemen Admin
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Default Skin Treat
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Kelola daftar skin care default yang digunakan pelanggan sebagai
          pilihan awal rutinitas, make up, barrier, warna, dan scars.
        </p>
      </div>

      <PageDefaultSkinTreat activeCategory={activeCategory} />
    </div>
  );
}
