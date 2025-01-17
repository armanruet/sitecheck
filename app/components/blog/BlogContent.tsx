'use client';

import { useState } from 'react';
import { BlogPost } from '../../blog/utils.server';
import TagsList from './TagsList';
import { BlogPosts } from '../posts';

interface BlogContentProps {
  posts: BlogPost[];
  tagCounts: { [key: string]: number };
}

export default function BlogContent({ posts, tagCounts }: BlogContentProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const formattedTags = Object.entries(tagCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Filter posts based on selected tag
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.frontmatter.tags?.includes(selectedTag))
    : posts;

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <TagsList 
          tags={formattedTags} 
          selectedTag={selectedTag} 
          onTagSelect={handleTagSelect}
        />
        <BlogPosts posts={filteredPosts} />
      </div>
    </div>
  );
}
