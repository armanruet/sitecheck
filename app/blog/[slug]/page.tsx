import { getPostFromSlug } from '../utils.server';
import { MDXClient } from '../../components/mdx-client';
import { Subscribe } from '../../components/blog/Subscribe';
import { Comments } from '../../components/blog/Comments';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { content, metadata } = await getPostFromSlug(params.slug);

  return (
    <article className="mx-auto max-w-[900px] px-4 py-12">
      <header className="mb-24">
        <h1
          className="text-[48px] font-black text-center leading-[1.1] mb-16 tracking-tight 
          bg-clip-text text-transparent bg-gradient-to-r 
          from-gray-900 to-gray-600 
          dark:from-gray-100 dark:to-gray-400"
        >
          {metadata.title}
        </h1>
      </header>

      <div
        className="prose prose-lg mx-auto max-w-none
        dark:prose-invert
        prose-headings:font-bold prose-headings:text-[32px] prose-headings:leading-tight 
        prose-headings:mt-16 prose-headings:mb-8
        prose-headings:text-gray-900 dark:prose-headings:text-gray-100
        
        prose-p:text-justify prose-p:text-[20px] prose-p:leading-[1.8] prose-p:mb-8 
        prose-p:tracking-normal prose-p:text-gray-700 dark:prose-p:text-gray-300
        
        prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-gray-50
        
        prose-a:text-blue-600 dark:prose-a:text-blue-400 
        prose-a:no-underline hover:prose-a:underline
        
        prose-ul:my-8 prose-li:text-[20px] prose-li:mb-2
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        
        prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
        prose-pre:my-8 prose-pre:rounded-xl prose-pre:shadow-lg
        
        prose-code:text-gray-800 dark:prose-code:text-gray-200
        prose-code:bg-gray-100 dark:prose-code:bg-gray-800/50
        prose-code:px-1 prose-code:rounded
        
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 
        dark:prose-blockquote:border-gray-700
        prose-blockquote:pl-6 prose-blockquote:italic
        prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300"
      >
        <MDXClient source={content} />
      </div>

      <div className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-800">
        <Subscribe />
        <Comments />
      </div>
    </article>
  );
}
