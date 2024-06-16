import { TwitterIcon } from '@components/icons';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Date from '../../../../components/Date';
import { getPostData } from '../../../../lib/posts';
import utilStyles from '../../../../scss/utils.module.scss';

const components: object = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        customStyle={{
          borderRadius: '10px',
          fontSize: '18px',
        }}
        style={coldarkDark}
        language={match[1]}
        PreTag='div'
        children={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code
        className={className}
        style={{ fontFamily: 'JetBrains Mono' }}
        {...props}
      />
    );
  },
};

export async function generateMetadata({ params }) {
  const postData = await getPostData(params.id);

  return {
    title: postData.title,
  };
}

export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <>
      <article className={utilStyles.article}>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        <ReactMarkdown components={components} children={postData.markdown} />
      </article>

      <div className='shareArticle'>
        <div className='hr-div'>
          <div className='share_article_hr'></div> <span>Share article on</span>
        </div>

        <a
          href={`https://twitter.com/intent/tweet?url=https://samuelomanchi.me/blog/${postData.slug}&text=${postData.title}&via=cortehzz`}
        >
          <TwitterIcon />
        </a>
      </div>
    </>
  );
}
