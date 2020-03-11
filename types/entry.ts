export interface Category extends Base {
  fields: {
    name: string;
    slug: string;
    sort: number;
  };
}

export interface Author extends Base {
  fields: {
    name: string;
    icon: string;
    at: string;
  };
}

export interface Blog extends Base {
  fields: {
    title: string;
    description: string;
    body: string;
    author: Author;
    category: Category;
    slug: string;
    tags: string[];
    postImage: string;
    public: boolean;
    releaseDate: string;
  };
}

export interface Base {
  sys: Sys;
  fields: any;
}

interface Sys {
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

interface ChildSys {
  sys: {
    id: string;
    type: string;
    linkType: string;
  };
}
