import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const OAIQ_PIXEL_ID = "5S4y7hFbybamPw8uW2p91K";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta name="google" content="notranslate" />
        <Script id="oaiq-pixel" strategy="beforeInteractive">
          {`
            !function(w,d,s,u){
              if(w.oaiq)return;
              var q=function(){q.q.push(arguments)};
              q.q=[];
              w.oaiq=q;
              var js=d.createElement(s);
              js.async=true;
              js.src=u;
              var f=d.getElementsByTagName(s)[0];
              f.parentNode.insertBefore(js,f);
            }(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
            window.oaiq("init", { pixelId: "${OAIQ_PIXEL_ID}" });
          `}
        </Script>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
