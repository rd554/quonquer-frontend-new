import ReactPlayer from "react-player";
import Layout from "../components/Layout";
import { blogForHomePage } from "../actions/blog";
import smallCard from "../components/blog/SmallCard";
import LatestBlogs from '../components/LatestBlogs'

const Home = ({ latestBlogs }) => {
  return (
    <Layout>
      <div>
        <div className="app-main-bg w-full relative mb-8">
          <ReactPlayer
            url="https://quonquerbucket.s3.ap-south-1.amazonaws.com/homevideo.mov"
            height="80%"
            width="100%"
            playing={true}
            muted
            loop
          />
        </div>
        <div className="mt-8">
        <LatestBlogs latestBlogs={latestBlogs}/>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps = async (context) => {
  const res = await blogForHomePage()
  return {
    props: {
      latestBlogs : res
    },
  }
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { } } // See the "paths" section below
    ],
    fallback: true 
  };
}


export default Home;

