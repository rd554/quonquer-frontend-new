import React from "react";
import Head from "next/head";
import "../styles.css";
import "../public/app.css";
import "../node_modules/react-quill/dist/quill.snow.css";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quonquer</title>
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
