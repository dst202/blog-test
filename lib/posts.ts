import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { cache } from 'react';
import remark from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm'; // Import the remark-gfm plugin

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      slug: matterResult.data.slug,
      tags: matterResult.data.tags,
      description: matterResult.data.description,
      ...matterResult.data,
    };
  });
  return allPostsData.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export const getPostData = cache(async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string with GFM support
  const processedContent = await remark()
    .use(remarkGfm) // Enable GitHub Flavored Markdown features, including tables
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    markdown: matterResult.content,
    title: matterResult.data.title,
    date: matterResult.data.date,
    slug: matterResult.data.slug,
    ...matterResult.data,
  };
});
