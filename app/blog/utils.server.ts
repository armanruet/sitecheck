import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrettyCode from 'rehype-pretty-code';

export interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    date: string;
    description: string;
    tags: string[];
    image?: string;
    draft?: boolean;
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
  
  const posts = files.map(fileName => {
    const slug = fileName.replace('.mdx', '');
    const filePath = path.join(postsDirectory, fileName);
    const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
    
    return {
      slug,
      metadata: {
        title: data.title,
        date: data.date,
        description: data.description,
        tags: Array.isArray(data.tags) 
          ? data.tags 
          : data.tags?.split(',').map((tag: string) => tag.trim()) || [],
        image: data.image,
        draft: data.draft,
      }
    };
  });

  return posts
    .filter(post => !post.metadata.draft)
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
}

export async function getPostFromSlug(slug: string) {
  const filePath = path.join(process.cwd(), 'app/blog/posts', `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        [rehypePrettyCode, { theme: 'github-dark' }]
      ],
    },
    scope: data,
  });

  return {
    content: mdxSource,
    metadata: {
      title: data.title,
      date: data.date,
      description: data.description,
      tags: Array.isArray(data.tags) 
        ? data.tags 
        : data.tags?.split(',').map((tag: string) => tag.trim()) || [],
      image: data.image,
    }
  };
}
