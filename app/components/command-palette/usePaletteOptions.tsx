'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { BlogPost } from '../../blog/utils.server';

interface PaletteOption {
  id: string;
  name: string;
  onSelect: (id: string) => void;
}

export function usePaletteOptions(posts: BlogPost[]) {
  const router = useRouter();

  const blogOptions: PaletteOption[] = useMemo(() => 
    posts
      .filter(post => post.frontmatter.title)
      .map((post) => ({
        id: post.slug,
        name: post.frontmatter.title || 'Untitled',
        onSelect: (slug: string) => router.push(`/blog/${slug}`)
      }))
  , [posts, router]);

  const handleSelect = useCallback((id: string) => {
    const option = blogOptions.find(opt => opt.id === id);
    if (option) {
      option.onSelect(id);
    }
  }, [blogOptions]);

  return {
    options: blogOptions,
    handleSelect
  };
}
