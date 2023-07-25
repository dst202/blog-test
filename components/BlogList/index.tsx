import React from 'react';
import { getSortedPostsData } from '@lib/posts';
import Date from '@components/Date';
import Link from 'next/link';
import { ArrowForwardIcon } from '@components/icons';
import Image from 'next/image';

interface BlogListProps {
  allPostsData: any;
  home?: boolean;
  styles: { [key: string]: string };
}

const BlogList = ({ allPostsData, styles, home }: BlogListProps) => {
  const { list, listItem, imageContainer, rightDescription, lightText, link } =
    styles;
  return (
    <ul className={list}>
      {allPostsData.map(
        ({ id, date, title, description, tags, image }, index) => (
          <React.Fragment key={id}>
            <li className={listItem}>
              <span className={imageContainer}>
                <Image
                  src={image}
                  alt={`Blog Image for ${title}`}
                  height={index == 0 && home ? 350 : 169}
                  width={176}
                  objectFit='cover'
                />
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
        )
      )}
    </ul>
  );
};

export default BlogList;
