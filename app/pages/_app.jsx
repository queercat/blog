import '../styles/globals.css'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export default function App({ Component, pageProps }) {
  return (
  <div className='app'>
    <Header></Header>
    <Component {...pageProps} />
    <Footer></Footer>
  </div>
  )
}
