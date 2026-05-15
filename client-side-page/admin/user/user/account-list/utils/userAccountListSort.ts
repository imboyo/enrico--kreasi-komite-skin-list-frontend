"use client";

export type UserSortValue =
  | "name-asc"
  | "name-desc"
  | "phone-asc"
  | "phone-desc"
  | "status-asc";

export const DEFAULT_USER_SORT_VALUE: UserSortValue = "name-asc";
