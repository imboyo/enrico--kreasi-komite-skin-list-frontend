// Shared DTO types reused across user sub-services
export type SortDto = {
  field: string;
  direction: "ASC" | "DESC";
};

export type FilterDto = Record<string, unknown>;
