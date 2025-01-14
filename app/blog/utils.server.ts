import { compileMDX } from 'next-mdx-remote/rsc';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import rehypePrettyCode from 'rehype-pretty-code';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  image?: string;
  [key: string]: any;
}

export interface BlogPost {
  slug: string;
  frontmatter: Frontmatter;
}

interface PostData {
  content: MDXRemoteSerializeResult;
  metadata: Frontmatter;
}

export async function getMDXContent(source: string): Promise<{ content: MDXRemoteSerializeResult; frontmatter: Frontmatter }> {
  // @ts-expect-error - Types are mismatched but runtime works correctly
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
        development: process.env.NODE_ENV === 'development',
      },
      parseFrontmatter: true,
    },
  });

  return { content, frontmatter };
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
      frontmatter: {
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
    .filter(post => !post.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export async function getPostFromSlug(slug: string) {
  const filePath = path.join(process.cwd(), 'app/blog/posts', `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      // @ts-expect-error - Type mismatch between vfile versions
      rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
      development: process.env.NODE_ENV === 'development',
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
