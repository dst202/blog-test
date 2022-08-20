import Head from 'next/head';
import { siteTitle, Layout } from '../../components/layout';
import utilStyles from '@scss/utils.module.scss';
import styles from './blog.module.scss';

import { getSortedPostsData } from '../../lib/posts';
import Header from '../../components/Header/Header';
import Footer from '@components/Footer';
import React, { useState } from 'react';
import Wrapper from '@components/Wrapper';
import Input from '@components/Forms/Input';
import Button from '@components/Forms/Button';
import BlogList from '@components/BlogList';
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [selected, setSelected] = React.useState<{ [key: string]: boolean }>(
    {}
  );

  const [searchTerm, setSearchTerm] = useState<string>('');

  const toggleSelected = (buttonItem: string) => {
    setSelected({ [buttonItem]: selected[buttonItem] ? false : true });
  };

  const [selectedTag] = Object.keys(selected);

  const [activeTag] = Object.values(selected);

  const filterPostsBySearchTerm = allPostsData.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) |
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPosts =
    selectedTag && activeTag
      ? filterPostsBySearchTerm.filter((post) =>
          post.tags.includes(selectedTag.toLowerCase())
        )
      : filterPostsBySearchTerm;

  return (
    <>
      <Header />
      <Layout>
        <Head>
          <title>The {siteTitle}'s Blog</title>
        </Head>

        <Wrapper>
          <section className='main-container'>
            <h1>
              <span>/</span>blog-posts<span>.</span>
            </h1>
            <div className='filter-posts'>
              <Input
                type='text'
                placeholder='Find post easily'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className='category-buttons'>
                {['React', 'React Native', 'Javascript', 'CSS'].map(
                  (buttonItem) => (
                    <Button
                      key={buttonItem}
                      label={buttonItem}
                      mode={'secondary'}
                      className={selected[buttonItem] ? 'selected' : ''}
                      onClick={() => toggleSelected(buttonItem)}
                    />
                  )
                )}
              </div>
            </div>
            <BlogList styles={styles} allPostsData={filteredPosts} />
          </section>
          <section
            className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
          ></section>
        </Wrapper>
      </Layout>
      <Footer />
    </>
  );
}
