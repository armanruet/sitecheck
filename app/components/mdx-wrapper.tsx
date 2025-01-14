'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { components } from './mdx-content';

interface MDXWrapperProps {
  source: MDXRemoteProps;
}

export function MDXWrapper({ source }: MDXWrapperProps) {
  return (
    <div className="mdx-content prose dark:prose-invert">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
