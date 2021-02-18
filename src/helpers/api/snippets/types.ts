export type Snippet = {
  id: number;
  title: string;
  description: string;
  snippetContentMD: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  userId: number;
  isFavorite: boolean;
};

export type UserSnippet = Snippet & {
  isUser: boolean | null;
};
