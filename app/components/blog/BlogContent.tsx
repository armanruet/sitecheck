'use client';

import { useState } from 'react';
import { BlogPost } from '../../blog/utils.server';
import SearchBar from './SearchBar';
import TagsList from './TagsList';
import { BlogPosts } from '../posts';

interface BlogContentProps {
  posts: BlogPost[];
  tagCounts: { [key: string]: number };
}

export default function BlogContent({ posts, tagCounts }: BlogContentProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <TagsList tags={Object.keys(tagCounts)} counts={tagCounts} />
        <BlogPosts posts={posts} />
      </div>
    </div>
  );
}
