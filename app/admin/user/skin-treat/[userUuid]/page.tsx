import type { Metadata } from "next";

import { PageUserSkinTreat } from "@/client-side-page/admin/user/skin-treat/PageUserSkinTreat";
import {
  DEFAULT_ADMIN_USER_SKIN_TREAT_CATEGORY,
  isAdminUserSkinTreatCategoryId,
  type AdminUserSkinTreatCategoryId,
} from "@/client-side-page/admin/user/skin-treat/utils/adminUserSkinTreatCategory";

export const metadata: Metadata = {
  title: "User Skin Treat",
};

interface AdminUserSkinTreatPageProps {
  params: Promise<{
    userUuid: string;
  }>;
  searchParams: Promise<{
    category?: string | string[];
  }>;
}

function resolveActiveCategory(
  categoryValue: string | string[] | undefined,
): AdminUserSkinTreatCategoryId {
  const normalizedCategoryValue = Array.isArray(categoryValue)
    ? categoryValue[0]
    : categoryValue;

  // The route owns the canonical fallback so invalid query strings do not leak
  // unsupported categories into the client page contract.
  return isAdminUserSkinTreatCategoryId(normalizedCategoryValue)
    ? normalizedCategoryValue
    : DEFAULT_ADMIN_USER_SKIN_TREAT_CATEGORY;
}

export default async function AdminUserSkinTreatPage({
  params,
  searchParams,
}: Readonly<AdminUserSkinTreatPageProps>) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolveActiveCategory(resolvedSearchParams.category);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-4 py-4 lg:px-8 lg:py-6">
      {/* Section: User skin treat page title */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Manajemen Admin
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Skin Treat Pengguna
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Lihat daftar skin care milik pengguna yang terdiri dari routine, make
          up, barrier, warna, scars, contour, fats, dan hairs.
        </p>
      </div>

      <PageUserSkinTreat
        userUuid={resolvedParams.userUuid}
        activeCategory={activeCategory}
      />
    </div>
  );
}
