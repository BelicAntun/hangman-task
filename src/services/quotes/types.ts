export interface Quote {
  id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: Date | null;
  dateModified: Date | null;
}
