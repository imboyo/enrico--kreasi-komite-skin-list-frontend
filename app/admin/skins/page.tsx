import type { Metadata } from "next";

import { PageAdminSkins } from "@/client-side-page/admin/skins/PageAdminSkins";
import {
  DEFAULT_ADMIN_SKIN_CATEGORY,
  isAdminSkinCategoryId,
  type AdminSkinCategoryId,
} from "@/client-side-page/admin/skins/utils/skinCategory";

export const metadata: Metadata = {
  title: "Skin Management",
};

interface AdminSkinsPageProps {
  searchParams: Promise<{
    category?: string | string[];
  }>;
}

function resolveActiveCategory(
  categoryValue: string | string[] | undefined,
): AdminSkinCategoryId {
  const normalizedCategoryValue = Array.isArray(categoryValue)
    ? categoryValue[0]
    : categoryValue;

  // The route owns the canonical fallback so invalid query strings do not leak
  // unsupported categories into the client page contract.
  return isAdminSkinCategoryId(normalizedCategoryValue)
    ? normalizedCategoryValue
    : DEFAULT_ADMIN_SKIN_CATEGORY;
}

export default async function AdminSkinsPage({
  searchParams,
}: Readonly<AdminSkinsPageProps>) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolveActiveCategory(resolvedSearchParams.category);

  return <PageAdminSkins activeCategory={activeCategory} />;
}
