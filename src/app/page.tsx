import BlogList from '@components/BlogList';
import Hero from '@components/Hero/Hero';
import { getSortedPostsData } from '@lib/posts';
import utilStyles from '@scss/utils.module.scss';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();
  const firstFourPost = allPostsData.map((post) => post).splice(0, 4);
  return (
    <>
      <header>
        <Hero />
      </header>
      <>
        <section className='blog' id='latest-blog'>
          <h2>
            <span>Blog</span>
          </h2>

          <h2>Latest Posts</h2>

          <BlogList allPostsData={firstFourPost} styles={utilStyles} home />
          <span className={utilStyles.link}>
            <Link href='/blog'>View all posts</Link>
          </span>
        </section>
      </>
      {/* <Career /> */}
    </>
  );
}
