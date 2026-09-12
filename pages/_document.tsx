import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const OAIQ_PIXEL_ID = "5S4y7hFbybamPw8uW2p91K";
const META_PIXEL_ID = "1610344813865835";

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
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </Head>
      <body className="antialiased">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
