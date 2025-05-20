import React from 'react';
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import BottomBar from "./BottomBar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="mt-12">{children}</main>
      <Footer />
      <BottomBar />
    </React.Fragment>
  );
};

export default Layout;
