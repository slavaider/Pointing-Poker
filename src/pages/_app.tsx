import { Provider } from 'react-redux';
import React from 'react';
import { store } from 'src/store';
import '../styles/base.scss';
import '../styles/null.scss';
import AppLayout from '../components/AppLayout/AppLayout';

const App: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
};
export default App;
