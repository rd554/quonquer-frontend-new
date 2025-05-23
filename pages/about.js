import React from "react";
import Layout from "../components/Layout";
import AboutPage from "../components/AboutPage";

import WorkWithUs from "../components/WorkWithUs";

const About = () => {
  return (
    <Layout>
      <div>
        <div>
          <img src="/f.png" className="items-center mx-auto" alt="Logo" />
        </div>
        <div>
          <AboutPage />
        </div>

        <div>
          <WorkWithUs />
        </div>
      </div>
    </Layout>
  );
};

export default About;
