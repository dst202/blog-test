import Date from '@components/Date';
import { ArrowForwardIcon } from '@components/icons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
        ({ id, date, title, description, tags, image }, index) => {
          const imageProps = {
            ...(home && index === 0
              ? { fill: true }
              : { height: 130, width: 350 }),
          };

          return (
            <React.Fragment key={id}>
              <li className={listItem}>
                <span className={imageContainer}>
                  <Image
                    src={image}
                    alt={`Blog Image for ${title}`}
                    objectFit='cover'
                    {...imageProps}
                  />
                </span>

                {/* <span>10 mins read</span> */}
                <span className={rightDescription}>
                  <small className={lightText}>
                    <Date dateString={date} />
                  </small>{' '}
                  <Link href={`/blog/${id}`} className='title'>
                    {title}
                  </Link>
                  <p>{description}</p>
                  <Link href={`/blog/${id}`} legacyBehavior>
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
          );
        }
      )}
    </ul>
  );
};

export default BlogList;
