import React from "react";
import utilStyles from "@scss/utils.module.scss";
import { getSortedPostsData } from "@lib/posts";
import Date from "@components/Date";
import Link from "next/link";
import { ArrowForwardIcon } from "@components/icons";

interface BlogListProps {
  allPostsData: any;
}

const BlogList = ({ allPostsData }: BlogListProps) => {
  return (
    <ul className={utilStyles.list}>
      {allPostsData
        .map(({ id, date, title, description, tags, image }) => (
          <React.Fragment key={id}>
            <li className={utilStyles.listItem}>
              <span className={utilStyles.imageContainer}>
                <img src={image} alt={title} />
              </span>

              {/* <span>10 mins read</span> */}
              <span className={utilStyles.rightDescription}>
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>{" "}
                <Link href={`/blog/${id}`}>
                  <a className="title">{title}</a>
                </Link>
                <small>{description}</small>
                <Link href={`/blog/${id}`}>
                  <span className={utilStyles.link}>
                    <a>
                      <span>Read</span>
                      <ArrowForwardIcon />
                    </a>
                  </span>
                </Link>
              </span>
            </li>
          </React.Fragment>
        ))
        .splice(0, 4)}
    </ul>
  );
};

export default BlogList;
