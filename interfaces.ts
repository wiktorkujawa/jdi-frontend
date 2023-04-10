
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

export interface Button {
  text: string;
  url: string;
  aria_label?: string;
  target?: '_blank' | '_self';
}

export interface Page extends ApiResponse {
  docs: PageContent[]
}

export interface Project extends ApiResponse {
  docs: ProjectContent[]
}

export interface ProjectContent {
  id: string,
  name: string,
  mediaUrl?: string;
  description: string;
  createdAt: string,
  updatedAt: string,
  button: Button,
  media: Upload
};

export interface PageContent {
  id: string,
  name: string,
  slug: string,
  customComponents: any[],
  meta: {
    title: string,
    description: string;
    image: Upload;
  },
  createdAt: string,
  updatedAt: string
};


export interface Upload {
  id: string,
  filename: string,
  width: number,
  height: number,
  mimeType: string
  filesize: number,
  createdAt: string,
  updatedAt: string,
  url: string,
  relationTo: string,
  sizes: any,
  original_doc: {
    filename: string
  }
}