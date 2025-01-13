'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import {
  HiOutlineDocumentAdd,
  HiOutlineDocumentDuplicate,
  HiOutlineHome,
  HiOutlinePencil,
  HiOutlineUser,
} from 'react-icons/hi';
import { TbBolt, TbBoltOff } from 'react-icons/tb';
import { BlogPost } from '../../blog/utils.server';

export default function usePaletteOptions() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Fetch posts on the client side
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    }
    fetchPosts();
  }, []);

  const generalOptions = [
    {
      id: 'Toggle Theme',
      name: 'Toggle Theme',
      icon: theme === 'dark' ? <TbBolt /> : <TbBoltOff />,
      onSelect: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
    {
      id: 'Copy Current URL',
      name: 'Copy Current URL',
      icon: <HiOutlineDocumentDuplicate />,
      onSelect: () => navigator.clipboard.writeText(window.location.href),
    },
  ];

  const pageOptions = [
    {
      id: '/',
      name: 'Home',
      icon: <HiOutlineHome />,
      onSelect: (v) => router.push(v),
    },
    {
      id: '/blog',
      name: 'Blog',
      icon: <HiOutlinePencil />,
      onSelect: (v) => router.push(v),
    },
    {
      id: '/about',
      name: 'About',
      icon: <HiOutlineUser />,
      onSelect: (v) => router.push(v),
    },
    {
      id: '/uses',
      name: 'Uses',
      icon: <HiOutlineDocumentAdd />,
      onSelect: (v) => router.push(v),
    },
  ];

  const blogOptions = posts.map((post) => ({
    id: post.slug,
    name: post.metadata.title,
    onSelect: (slug) => router.push(`/blog/${slug}`),
  }));

  return { pageOptions, blogOptions, generalOptions };
}
