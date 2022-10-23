import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          property="og:title"
          content="TravMing - Round the World, Just A Few Clicks to Go ✈️"
        />
        <meta name="description" content="Round the World, Just A Few Clicks" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#86989A" />
        <meta
          property="og:image"
          content="https://travming.vercel.app/desktop_ss.png"
        />
        <meta property="og:url" content="https://travming.vercel.app" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <link rel="manifest" href="/manifest.json"></link>
        <link rel="apple-touch-icon" href="/icons/icon.png" />
        <link rel="icon" href="/icons/favicon.ico" />

        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap"
          rel="stylesheet"
        /> */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=chillax@600,500,300,700,400,200&display=swap"
          rel="stylesheet"></link>
        <link
          href="https://api.fontshare.com/v2/css?f[]=anton@400&display=swap"
          rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
