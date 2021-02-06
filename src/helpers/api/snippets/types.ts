export type Snippet = {
  id: number;
  title: string;
  description: string;
  snippetContentMD: string[];
  createdAt: string;
  updatedAt: string;
  isUser: boolean | null;
};
