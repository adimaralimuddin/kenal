import Head from "next/head";
import MainContent from "../components/main/MainContent";
import MainLayout from "../components/main/MainLayout";

export default function feed() {
  return (
    <MainLayout>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <MainContent />
    </MainLayout>
  );
}
