import React from "react";
import Layout from "../components/Layout";
import f from "../public/f.png";
import AboutPage from "../components/AboutPage";

import WorkWithUs from "../components/WorkWithUs";

const About = () => {
  return (
    <Layout>
      <div>
        <div>
          <img src={f} className="items-center mx-auto" alt="founder" />
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
