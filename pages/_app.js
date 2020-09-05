import Head from "next/head";
import "../styles.css";
import "../public/app.css";
import "../node_modules/react-quill/dist/quill.snow.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Quonquer</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
