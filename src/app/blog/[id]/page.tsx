import Date from '@components/Date';
import { TwitterIcon } from '@components/icons';
import { getPostData } from '@lib/posts';
import utilStyles from '@scss/utils.module.scss';
import Script from 'next/script';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyButton } from './CopyButton';

const LinkRenderer = (props) => {
  return (
    <a href={props.href} target='_blank' rel='noopener noreferrer'>
      {props.children}
    </a>
  );
};

const components: object = {
  a: LinkRenderer,
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');

    const codeString = String(children).replace(/\n$/, '');

    return !inline && match ? (
      <div
        style={{
          position: 'relative',
        }}
      >
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
        <CopyButton codeString={codeString} />
      </div>
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
          rel='noopener noreferrer'
          href={`https://twitter.com/intent/tweet?url=https://samuelomanchi.me/blog/${postData.slug}&text=${postData.title}&via=cortehzz`}
        >
          <TwitterIcon />
        </a>
      </div>
      <div className='giscus' />

      <Script
        src='https://giscus.app/client.js'
        data-repo='dst202/blog-test'
        data-repo-id='MDEwOlJlcG9zaXRvcnkyODkzNDI2ODY='
        data-category='General'
        data-category-id='DIC_kwDOET8E3s4CgLk7'
        data-mapping='pathname'
        data-strict='0'
        data-reactions-enabled='1'
        data-emit-metadata='0'
        data-input-position='top'
        data-theme='light_protanopia'
        data-lang='en'
        data-loading='lazy'
        crossOrigin='anonymous'
        async
      />
    </>
  );
}
