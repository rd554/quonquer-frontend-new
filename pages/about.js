import Layout from "../components/Layout";
import user from "../public/images/001-user.png";

const About = () => {
  return (
    <Layout>
      <div className="w-1/6 content-center mx-auto mt-12">
        <img
          src={user}
          className="rounded-full shadow-md border-2 w-16 h-16"
          alt="user"
        />
      </div>
    </Layout>
  );
};

export default About;
