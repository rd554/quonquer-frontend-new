import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate";

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="text-center">
          <h2 className="text-gray-800 font-medium text-2xl">Update blog</h2>
        </div>
        <div>
          <BlogUpdate />
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
