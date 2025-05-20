import type { components } from '@/contracts/generated/maverick-schema';

export const emptyPaginatedResponse = () =>
  ({
    results: [],
    pagination: {
      currentPage: 0,
      pageSize: 0,
      totalPages: 0,
      totalResults: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  }) as unknown as {
    results: components['schemas']['Event'][];
    pagination: components['schemas']['Pagination'];
  };
