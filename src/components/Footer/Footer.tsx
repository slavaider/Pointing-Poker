import React, { FC } from 'react';
import styles from './Footer.module.scss';

// todo переписать текст!!!
const Footer: FC = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer__wrapper}>
          <div className={styles.footer__content}>
            <a href="https://rs.school/react/">
              <div className={`${styles.logo__rs} ${styles.logo}`}></div>
            </a>
            <a href="">
              <div className={`${styles.logo__slavaider} ${styles.logo}`}></div>
            </a>
            <a href="">
              <div className={`${styles.logo__arsen} ${styles.logo}`}></div>
            </a>
            <a href="">
              <div className={`${styles.logo__victor} ${styles.logo}`}></div>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
