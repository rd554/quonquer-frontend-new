import React from 'react';
import Layout from "../components/Layout";
import ReactPlayer from "react-player";
import LatestBlogs from '../components/LatestBlogs';

const Home = () => {
  return (
    <Layout>
      <div>
        <div className="app-main-bg w-full relative mb-8">
          <ReactPlayer
            url="/Walkcycle_1 MOV.mp4"
            height="100%"
            width="100%"
            playing={true}
            muted
            loop
            playsinline
            controls={false}
          />
          <video
            src="/Walkcycle_1 MOV.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ display: 'none', width: '100%', height: 'auto' }}
          />
        </div>
        <div className="mt-8">
          <LatestBlogs latestBlogs={[]} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

