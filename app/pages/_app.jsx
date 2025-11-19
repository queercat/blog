import "../styles/globals.css";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <div className="app">
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
      <div className="analytics-script">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KTHK58PVNZ"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-KTHK58PVNZ');
        `}
        </Script>
      </div>
    </div>
  );
}
