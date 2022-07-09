interface ChildSys {
  sys: {
    id: string;
    type: string;
    linkType: string;
  };
}

export interface Sys {
  space: ChildSys;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: ChildSys;
  revision: number;
  contentType: ChildSys;
  locale: string;
}

export interface SingleItem {
  sys: Sys;
  fields: any;
}

export interface Category extends SingleItem {
  fields: {
    name: string;
    slug: string;
    sort: number;
  };
}

export interface File {
  url: string;
  detail: any;
  filename: string;
  contentType: string;
}

export interface Post extends SingleItem {
  fields: {
    title: string;
    description: string;
    body: string;
    category: Category;
    slug: string;
    tags: string[];
    public: boolean;
    releaseDate: string;
    latex: boolean;
  };
}

export interface FileDetail {
  size: number;
  image?: {
    width: number;
    height: number;
  };
}

export interface MultipleItem<T extends SingleItem> {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: T[];
}
