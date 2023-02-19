
export interface ApiResponse {
  totalDocs: number,
  limit: number,
  totalPages: number,
  page: number,
  pagingCounter: number,
  hasPrevPage: number,
  hasNextPage: number,
  prevPage: null,
  nextPage: null,
}

export interface Page extends ApiResponse {
  docs: PageContent[]
}

export interface PageContent {
  id: string,
  name: string,
  slug: string,
  customComponents: unknown[]
};

