'use client';

import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from './mdx-content';

interface MDXWrapperProps {
  content: MDXRemoteSerializeResult;
}

export function MDXWrapper({ content }: MDXWrapperProps) {
  return (
    <div className="mdx-content prose dark:prose-invert">
      <MDXRemote {...content} components={mdxComponents} />
    </div>
  );
}
