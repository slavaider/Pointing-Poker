import React, { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer__wrapper}>
          <div className={styles.footer__content}>
            <a href="https://rs.school/react/">
              <div className={`${styles.logo__rs} ${styles.logo}`} />
            </a>
            <a href="">
              <div className={`${styles.logo__slavaider} ${styles.logo}`} />
            </a>
            <a href="">
              <div className={`${styles.logo__arsen} ${styles.logo}`} />
            </a>
            <a href="">
              <div className={`${styles.logo__victor} ${styles.logo}`} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
