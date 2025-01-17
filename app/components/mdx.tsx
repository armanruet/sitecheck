'use client';

import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteProps } from 'next-mdx-remote';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

const components = {
  h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => {
    // Check if the child is an img element
    if (
      typeof children === 'object' &&
      children &&
      'type' in children &&
      children.type === 'img'
    ) {
      return children; // Return img directly without wrapping in p
    }
    
    return (
      <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
        {children}
      </p>
    );
  },
  
  a: ({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    if (href.startsWith('http')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
        {...props}
      >
        {children}
      </Link>
    );
  },
  
  img: ({ src, alt, ...props }: any) => {
    if (!src) return null;
    
    return (
      <div className="relative aspect-video my-8">
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-cover rounded-lg"
          {...props}
        />
      </div>
    );
  },
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
    </div>
  );
}
