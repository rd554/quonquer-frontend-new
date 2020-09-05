import Head from "next/head";
import Link from "next/link";
import SmallCard from "../../components/blog/SmallCard";
import moment from "moment";
import Layout from "../../components/Layout";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const userProfile = ({ user, query }) => {
  return (
    <React.Fragment>
      <Layout>
        <div>
          <div>
            <h5>hey</h5>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

userProfile.getInitialProps = ({ query }) => {
  console.log(query);
  return userPublicProfile(query.username).then((res) => {
    if (res.error) {
      console.log(res.error);
    } else {
      return { user: res.user, query };
    }
  });
};

export default userProfile;
