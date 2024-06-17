import Link from 'next/link';
import styles from './notfound.module.scss';

export default async function CatchAll() {
  return (
    <div className={styles.container}>
      <div>
        <h2>A bit lost there?</h2>
        <p>404 - Page Not Found</p>
      </div>
      <div>
        <Link href={`/`} prefetch>
          <span>Back home</span>
        </Link>
      </div>
    </div>
  );
}
