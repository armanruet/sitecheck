export interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    date: string;
    description: string;
    tags: string[];
    readingTime?: number;
    draft: boolean;
    image: string | null;
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/posts');
  const posts = await res.json();
  return posts;
}
