import React from 'react';
import { getSortedPostsData } from '@lib/posts';
import Date from '@components/Date';
import Link from 'next/link';
import { ArrowForwardIcon } from '@components/icons';

interface BlogListProps {
  allPostsData: any;
  styles: { [key: string]: string };
}

const BlogList = ({ allPostsData, styles }: BlogListProps) => {
  const { list, listItem, imageContainer, rightDescription, lightText, link } =
    styles;
  return (
    <ul className={list}>
      {allPostsData.map(({ id, date, title, description, tags, image }) => (
        <React.Fragment key={id}>
          <li className={listItem}>
            <span className={imageContainer}>
              <img src={image} alt={title} />
            </span>

            {/* <span>10 mins read</span> */}
            <span className={rightDescription}>
              <small className={lightText}>
                <Date dateString={date} />
              </small>{' '}
              <Link href={`/blog/${id}`}>
                <a className='title'>{title}</a>
              </Link>
              <p>{description}</p>
              <Link href={`/blog/${id}`}>
                <span className={link}>
                  <a>
                    <span>Read</span>
                    <ArrowForwardIcon />
                  </a>
                </span>
              </Link>
            </span>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default BlogList;
