export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPaginatedResponse {
  items: BlogItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
