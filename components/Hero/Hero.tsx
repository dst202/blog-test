import Image from 'next/image';
import Link from 'next/link';
import heroStyles from './hero.module.scss';

import { DribbbleIcon, GithubIcon, LinkedinIcon, TwitterIcon } from '../icons';

export const socials = [
  {
    link: 'https://twitter.com/surya_chilukur',
    icon: <TwitterIcon />,
    socialName: 'Twitter',
  },
  {
    link: 'https://www.linkedin.com/in/suryachilukuri/',
    icon: <LinkedinIcon />,
    socialName: 'Linkedin',
  },
  {
    link: 'https://github.com/dst202',
    icon: <GithubIcon />,
    socialName: 'Github',
  },
];
const Hero = () => {
  const { heroSection, heroCopy, imageContainer, my_name, duties } = heroStyles;
  return (
    <div className={heroCopy}>
      <div className={imageContainer}>
        <Image
          src={'/images/self.webp'}
          alt={'Surya Chilukuri portrait'}
          width={95}
          height={95}
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className={heroSection}>
        <h1 className={my_name}>Hi, My name is Surya Chilukuri</h1>

        <ul className={duties}>
          {['Embedded Engineer', 'Hardware developer'].map(
            (title, index) => (
              <li key={title}>
                <span>{title}</span>

                {index === 0 ? (
                  <svg
                    width='4'
                    height='5'
                    viewBox='0 0 4 5'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='2' cy='2.35712' r='2' fill='#D9D9D9' />
                  </svg>
                ) : null}
              </li>
            )
          )}
        </ul>

        <div className={heroStyles.social_icons_top}>
          {socials.map(({ link, icon, socialName }) => (
            <Link
              href={link}
              key={link}
              target='_blanck'
              aria-label={`Visit my profile on ${socialName}`}
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
