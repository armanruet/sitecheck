'use client';

import { BlogPost } from '../../blog/utils.server';
import TagsList from './TagsList';
import { BlogPosts } from '../posts';

interface BlogContentProps {
  posts: BlogPost[];
  tagCounts: { [key: string]: number };
}

export default function BlogContent({ posts, tagCounts }: BlogContentProps) {
  const formattedTags = Object.entries(tagCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <TagsList tags={formattedTags} />
        <BlogPosts posts={posts} />
      </div>
    </div>
  );
}
