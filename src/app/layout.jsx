import '../index.css'

export const metadata = {
  title: '乌拉拉大胜利 - 赛马娘资料站',
  description: '赛马娘 by八哲',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="YT9APkUOgxiot5X8_uKd7Y6WCPRiCsgcVNJpTa6mjFM" />
        {/* <script>
          {`function onGaLoad() {
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }
            gtag("js", new Date());

            gtag("config", "G-P8P8LQ98HY");
          }`}
        </script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P8P8LQ98HY" onLoad="onGaLoad()"></script>

        <script
          data-ad-client="ca-pub-8175375243959470"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8175375243959470"
          crossorigin="anonymous"
        ></script> */}
      </head>

      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
