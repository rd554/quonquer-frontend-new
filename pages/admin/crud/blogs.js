import React from "react";
import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogRead from "../../../components/crud/BlogRead";

const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className="text-center">
          <h2 className="text-gray-800 font-medium text-2xl">Manage blogs</h2>
        </div>
        <div>
          <BlogRead />
        </div>
      </Admin>
    </Layout>
  );
};

export default Blogs;
