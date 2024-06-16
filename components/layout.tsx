import { ReactNode } from 'react-markdown';
import styles from './layout.module.scss';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
    </div>
  );
};
