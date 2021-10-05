import React, { FC } from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import SocketContext from 'src/shared/SocketContext';
import Header from '../Header';
import Footer from '../Footer';
import useSocket from '../../hooks/useSocket';

const AppLayout: FC = ({ children }) => {
  let host = 'http://localhost:3000';

  if (process.browser) {
    host = window.location.origin.replace(/https/, 'http');
  }

  const socket = useSocket(host);

  return (
    <SocketContext.Provider value={socket}>
      <Head>
        <title>Poker Planing</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        <main
          style={{
            flex: '1 1 auto',
            padding: '0 5px',
            backgroundColor: '#4e698e',
          }}
        >
          {children}
        </main>
      </Layout>
      <Footer />
    </SocketContext.Provider>
  );
};

export default AppLayout;
