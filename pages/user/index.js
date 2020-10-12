import Layout from "../../components/Layout";
import ProfileUpdate from "../../components/auth/ProfileUpdate";
import Link from "next/link";

const UserProfileUpdate = () => {

  return (
    <Layout>
      
        <div>
          <div>
            <ProfileUpdate />
          </div>
        </div>
      
    </Layout>
  );
};

export default UserProfileUpdate;
