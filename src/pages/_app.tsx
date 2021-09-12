import { Provider } from 'react-redux'
import React from 'react'
import { store } from 'src/store'
import '../styles/base.scss'

const App: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default App
