import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="text-center">
          <h2 className="text-gray-800 font-medium text-2xl">
            Create a new blog
          </h2>
        </div>
        <div>
          <BlogCreate />
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
