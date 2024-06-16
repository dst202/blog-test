'use client';

import utilStyles from '@scss/utils.module.scss';
import styles from './blog.module.scss';

import BlogList from '@components/BlogList';
import Button from '@components/Forms/Button';
import Input from '@components/Forms/Input';
import React, { useState } from 'react';
import { getSortedPostsData } from '../../../lib/posts';

export default function BlogPostPage({
  allPostsData,
}: {
  allPostsData: ReturnType<typeof getSortedPostsData>;
}) {
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
      <section className='main-container'>
        <h1>
          <span>/</span>blog-posts<span>.</span>
        </h1>
        <div className='filter-posts'>
          <Input
            type='search'
            placeholder='Find post easily'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className='category-buttons'>
            {['React', 'React Native', 'Javascript', 'CSS', 'NextJS'].map(
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
        {filteredPosts.length ? (
          <BlogList styles={styles} allPostsData={filteredPosts} />
        ) : (
          <div className={styles.empty}>
            Couldn't find any{' '}
            {Object.values(selected)[0] ? Object.keys(selected) : ''} post(s)
          </div>
        )}
      </section>
      <section
        className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
      ></section>
    </>
  );
}
