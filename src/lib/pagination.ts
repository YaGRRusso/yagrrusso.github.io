export function paginationInput(page: number, limit: number) {
  return { limit, skip: (page - 1) * limit };
}

export function getPagination(
  limit: number,
  skip = 0,
  total = 0
): {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
} {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  return {
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    totalPages,
  };
}
