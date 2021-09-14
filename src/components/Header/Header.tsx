import React, { FC } from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';

const Header: FC = () => {
  //

  // todo переделать Logo и доверстать

  return (
    <header className={styles.header}>
      <div className={styles.headerLine}>
        <div style={{ display: 'inline-block' }}>Logo</div>
        <Image width="13" height="10" src="/svg_message.svg" alt="messages" />
      </div>
      <div className={styles.greenLine} />
    </header>
  );
};

export default Header;
