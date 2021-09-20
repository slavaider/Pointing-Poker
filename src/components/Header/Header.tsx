import React, { FC, useState } from 'react';
import { Drawer } from 'antd';
import Image from 'next/image';
import styles from './Header.module.scss';
import Message from '../Message';

const Header: FC = () => {
  const [visible, setVisible] = useState(false);
  //

  // todo переделать Logo и доверстать

  return (
    <header className={styles.header}>
      <div className={styles.headerLine}>
        <div style={{ display: 'inline-block' }}>Logo</div>

        <button
          className={styles.button}
          type="button"
          onClick={() => setVisible(true)}
        >
          <Image width="13" height="10" src="/svg_message.svg" alt="messages" />
        </button>
      </div>

      <div className={styles.greenLine} />

      <Drawer
        title="Messages:"
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
        width={'400px'}
        bodyStyle={{ backgroundColor: '#66999B' }}
      >
        <Message
          message={'Hi'}
          user={{
            FirstName: 'Arsen',
            position: 'junior software dew',
            size: 'mini',
          }}
        />
        <Message
          message={':)'}
          user={{
            FirstName: 'Fill',
            position: 'junior software',
            size: 'mini',
          }}
        />
        <Message
          message={
            'Hi, Imdksgmf nksdn ksdf , sdlkfn sdk fsdlk fdsk, sdlfmsdl . scxvsdsdfdsf. sdfdsfsdf. sdfsd.fdsv  fdvds ksd sak dsakd sak dsak'
          }
          user={{
            LastName: 'Lee',
            ItIsYou: true,
            isMaster: true,
            FirstName: 'Jo',
            position: 'midle',
            size: 'mini',
          }}
        />
      </Drawer>
    </header>
  );
};

export default Header;
