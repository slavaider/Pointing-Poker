import React, { FC } from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import Header from '../Header';
import Footer from '../Footer';
import useSocket from '../../hooks/useSocket';
import SocketContext from '../../shared/SocketContext';

const AppLayout: FC = ({ children }) => {
  const socket = useSocket('http://localhost:3000');

  return (
    <>
      <Head>
        <title>Poker Planing</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        <SocketContext.Provider value={socket}>
          <main
            style={{
              flex: '1 1 auto',
              padding: '0 20px',
              backgroundColor: '#fff',
            }}
          >
            {children}
          </main>
        </SocketContext.Provider>
      </Layout>
      <Footer />
    </>
  );
};

export default AppLayout;
