import "../styles/globals.css";
import ChatMain from "../components/chat/ChatMain";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
        <ChatMain />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
