export type Operators = "<" | "<=" | '==' | ">" | ">=" | 'array-contains' | 'array-contains-any';
export interface PaginationData {
  data: any[];
  total: number;
}

export interface Where {
  name: string;
  value: string;
  operator: Operators
}
export interface AutoPagination {
  whereAll: Where[];
  limit: number;
  page: number;
}