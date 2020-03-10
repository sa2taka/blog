export interface Category extends Base {
  fields: {
    name: string;
    slug: string;
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
