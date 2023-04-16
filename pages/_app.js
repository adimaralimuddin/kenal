import { ThemeProvider } from "next-themes";
import ChatMain from "../components/chat/ChatMain";
import Alert from "../components/elements/Alert";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
        <ChatMain />
        <Alert />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
