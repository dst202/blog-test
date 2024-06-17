import Image from 'next/image';
import Link from 'next/link';
import heroStyles from './hero.module.scss';

import { DribbbleIcon, GithubIcon, LinkedinIcon, TwitterIcon } from '../icons';

export const socials = [
  {
    link: 'https://dribbble.com/cortehz',
    icon: <DribbbleIcon />,
    socialName: 'Dribbble',
  },
  {
    link: 'https://twitter.com/cortehzz',
    icon: <TwitterIcon />,
    socialName: 'Twitter',
  },
  {
    link: 'https://www.linkedin.com/in/samuel-omanchi-aa49708a/',
    icon: <LinkedinIcon />,
    socialName: 'Linkedin',
  },
  {
    link: 'https://github.com/cortehz',
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
          alt={'Samuel Omanchi portrait'}
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
        <h1 className={my_name}>Hi, My name is Samuel Omanchi</h1>

        <ul className={duties}>
          {['Frontend Engineer', 'User Interface Designer'].map(
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
