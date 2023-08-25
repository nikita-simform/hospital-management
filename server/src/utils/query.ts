import { PaginationConfig, SortConfig } from "../types/appTypes";

const DEFAULT_PAGE_LIMIT = 0; //returns all the records from db
const DEFAULT_PAGE_NUMBER = 1;

const directions: { [key: string]: number } = {
  ASC: 1,
  DESC: -1,
};


export function getPagination(query: PaginationConfig) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;
  return {
    skip,
    limit,
  };
}
export function getSorting(query: SortConfig) {
  const { sort, direction } = query;
  if (!sort) {
    return {};
  }
  return {
    [sort]: directions[direction?.toUpperCase()] || directions.ASC
  }
}
