import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Admin from "../../components/auth/Admin";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="text-black pt-6 text-2xl -px-2 text-center font-medium normal-case">
          <h2>Admin Dashboard</h2>
        </div>
        <div className="bg-gray-100 mt-4 ml-6 mr-6 pt-6 pb-6">
          <section className="mr-auto ml-auto">
            <div className="pt-4 px-12">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-white">
                    <td className="border shadow-md text-center text-blue-400 text-md px-8 py-2">
                      <Link href="/admin/crud/category-tag" legacyBehavior>
                        <a>Create Category</a>
                      </Link>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="pt-4 px-12 mt-6">
              <table className="table-auto w-full bg-white">
                <thead>
                  <tr>
                    <td className="border shadow-md text-center text-blue-400 text-md px-8 py-2">
                      <Link href="/admin/crud/category-tag" legacyBehavior>
                        <a>Create Tag</a>
                      </Link>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="pt-4 px-12 mt-6">
              <table className="table-auto w-full bg-white">
                <thead>
                  <tr>
                    <td className="border shadow-md text-center text-blue-400 text-md px-8 py-2">
                      <Link href="/admin/crud/blog" legacyBehavior>
                        <a>Create Blog</a>
                      </Link>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="pt-4 px-12 mt-6">
              <table className="table-auto w-full bg-white">
                <thead>
                  <tr>
                    <td className="border shadow-md text-center text-blue-400 text-md px-8 py-2">
                      <Link href="/admin/crud/blogs" legacyBehavior>
                        <a>Update/Delete Blog</a>
                      </Link>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </section>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
