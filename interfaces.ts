export interface ApiResponse {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: number;
  hasNextPage: number;
  prevPage: null;
  nextPage: null;
}

export interface Button {
  text: string;
  url: string;
  aria_label?: string;
  target?: "_blank" | "_self";
}

export type GroupElement<T, label extends string> = {
  id: string;
} & { [K in label]: T };


export interface Page extends ApiResponse {
  docs: PageContent[];
}

export interface Project {
  id: string;
  name?: string;
  mediaUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  buttons?: GroupElement<Button, "button">[];
  button: Button;
  media: Upload;
}

export interface IMetaData {
  title: string;
  description: string;
  image: Upload;
}

export interface PageContent {
  id: string;
  name: string;
  slug: string;
  subpages?: PageContent[];
  isMasthead: boolean;
  masthead: SliderProps[];
  customComponents: any[];
  meta: IMetaData;
  createdAt: string;
  updatedAt: string;
}

export type SliderProps = {
  settings: SliderSettings;
  slides: SlidesProps[];
}

export type SlidesProps = {
  id: string;
  button: Button;
  media: Upload;
  copy?: ICopy[];
  heading?: string;
  attribution?: string;
}

type SliderSettings = {
  dots: boolean;
  loop: boolean;
  draggable: boolean;
  arrows: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  slidesPerRow: number;
}

export interface Upload {
  id: string;
  filename: string;
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  createdAt: string;
  updatedAt: string;
  url: string;
  relationTo: string;
  sizes: any;
  original_doc: {
    filename: string;
  };
  cloudinary: {
    public_id: string;
    resource_type: string;
    original_filename: string;
  };
}


export type IData = {
  page: INav[]
  pages: INav[]
}

export interface INav {
  id: string;
  name: string;
  slug: string;
}

export interface ICopy {
  type?: string;
  text?: string;
  value?: any;
  children?: ICopy[];
  indent: number;
  doc?: any;
  url?: string;
  relationTo?: string;
  newTab?: boolean;
}

export type CustomComponentType = {
  field: {
    blockType: string;
    [model: string]: any;
  }
}