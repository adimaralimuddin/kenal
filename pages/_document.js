import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark">
      <Head>
        {/* <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        /> */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </Head>
      <body
        onScroll={(e) => {
          console.log("hi");
        }}
        className="bg-[#F2F1FB] transition-colors duration-500 min-h-[100vh] dark:bg-slate-900d dark:bg-back-dark"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
