import Layout from "../components/Layout";
import foundr from "../public/foundr.png";
import AboutPage from "../components/AboutPage";

import WorkWithUs from "../components/WorkWithUs";

const About = () => {
  return (
    <Layout>
      <div>
        <div>
          <img src={foundr} className="items-center mx-auto" alt="founder" />
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
