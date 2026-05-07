// Shared DTO types reused across user sub-services
export type SortDto = {
  field: string;
  direction: "ASC" | "DESC";
};

export type FilterOperator =
  | "eq" | "neq"
  | "gt" | "gte" | "lt" | "lte"
  | "like" | "ilike"
  | "in" | "notIn"
  | "isNull" | "isNotNull"
  | "between" | "notBetween";

export type FilterItem = {
  field: string;
  operator: FilterOperator;
  // omit value for isNull / isNotNull
  value?: unknown;
};

// and/or condition groups — both are optional so callers can use either or both
export type FilterDto = {
  and?: FilterItem[];
  or?: FilterItem[];
};
