import React, { FC } from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import Header from '../Header';
import Footer from '../Footer';

const AppLayout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Poker Planing</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        <main
          style={{
            flex: '1 1 auto',
            padding: '0 20px',
            backgroundColor: '#fff',
          }}
        >
          {children}
        </main>
      </Layout>
      <Footer />
    </>
  );
};

export default AppLayout;
