'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from '../blog/utils.server';

interface BlogPostsProps {
  posts: BlogPost[];
}

// Update image paths to be absolute
const imagePath = (path: string) => {
  return path.startsWith('http') ? path : `/${path.replace(/^\//, '')}`;
};

export function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="group relative flex flex-col space-y-3"
        >
          <Link href={`/blog/${post.slug}`} className="block aspect-[4/3] relative overflow-hidden">
            {post.frontmatter.image ? (
              <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800">
                <Image
                  src={imagePath(post.frontmatter.image)}
                  alt={post.frontmatter.title || 'Blog post image'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </Link>

          <div className="flex flex-col space-y-2">
            <div className="space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.frontmatter.date}>
                {format(new Date(post.frontmatter.date), 'MMMM d, yyyy')}
              </time>
              <span>·</span>
              <span className="space-x-1">
                {post.frontmatter.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </div>

            <h2 className="text-xl font-semibold tracking-tight">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.frontmatter.title || 'Untitled Post'}
              </Link>
            </h2>

            <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
              {post.frontmatter.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
