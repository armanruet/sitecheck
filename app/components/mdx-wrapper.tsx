import { MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';
import { MDXClient } from './mdx-client';

interface MDXWrapperProps {
  content: MDXRemoteSerializeResult;
}

export function MDXWrapper({ content }: MDXWrapperProps) {
  return <MDXClient content={content} />;
}
