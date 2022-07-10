import "../styles/globals.css";
import Head from "next/head";
import ChatMain from "../components/chat/ChatMain";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className="bg-[#F2F1FB] min-h-[100vh] dark:bg-slate-800">
          <Component {...pageProps} />
          <ChatMain />
        </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
