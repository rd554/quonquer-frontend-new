import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="pt-6 text-center">
          <h2 className="text-gray-800 font-medium text-2xl">
            Manage Categories and Tags
          </h2>
        </div>
        <div>
          <Category />
        </div>
        <div>
          <Tag />
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
