import { getPostFromSlug } from '../utils.server';
import { MDXWrapper } from '../../components/mdx-wrapper';
import styles from './blog-post.module.css';

// Add this function for static page generation
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Add metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { metadata } = await getPostFromSlug(params.slug);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { content, metadata } = await getPostFromSlug(params.slug);

  return (
    <article className="mx-auto max-w-[900px] px-4 py-12">
      <header className="mb-8">
        <h1 className={styles.title}>{metadata.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{metadata.description}</p>
      </header>

      <div className={styles.content}>
        <MDXWrapper source={content} />
      </div>
    </article>
  );
}
