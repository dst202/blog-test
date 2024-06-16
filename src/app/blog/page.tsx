import { getSortedPostsData } from '@lib/posts';
import { Metadata } from 'next';
import BlogPostPage from './BlogPostPage';

export const metadata: Metadata = {
  title: `The Samuel Omanchi's Blog`,
};

export default async function BlogPosts() {
  const allPostsData = getSortedPostsData();

  return <BlogPostPage allPostsData={allPostsData} />;
}
