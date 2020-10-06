import ReactPlayer from "react-player";
import Layout from "../components/Layout";
import { list } from "../actions/blog";
import smallCard from "../components/blog/SmallCard";

const Home = () => {
  // const latestBlogs = () => {
  //   return blogs.map((blog, i) => (
  //     <article key={i}>
  //       <smallCard blog={blog} />
  //     </article>
  //   ));
  // };

  return (
    <Layout>
      <div>
        <div className="app-main-bg w-full relative mb-48">
          <ReactPlayer
            url="https://quonquerbucket.s3.ap-south-1.amazonaws.com/homevideo.mov"
            height="100"
            width="100"
            playing={true}
            muted
            loop
          />
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

// Home.getStaticProps = async () => {
//   const res = await list(blogs);
//   if (res.error) {
//     console.log(res.error);
//   } else {
//     return {
//       blogs: res.blogs,
//       title: res.title,
//     };
//   }
// };

export default Home;
