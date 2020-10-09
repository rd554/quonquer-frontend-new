import Head from "next/head";
import Link from "next/link";
import SmallCard from "../../components/blog/SmallCard";
import moment from "moment";
import renderHTML from "react-render-html";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { singleBlog, listRelated } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import fb from "../../public/images/facebook.png";
import insta from "../../public/images/instagram.png";
import tw from "../../public/images/twitter.png";
import li from "../../public/images/linkedin.png";
import wa from "../../public/images/whatsapp.png";
import DisqusThread from "../../components/DisqusThread";

const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setRelated(res);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const head = () => {
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blogs/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blogs/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>;
  };

  const showBlogCategories = (blog) => {
    return blog.categories.map((c, i) => {
      return (
        <Link key={i} href={`/categories/${c.slug}`}>
          <a>
            <button className="cursor-pointer rounded-full categories text-white font-extrabold hover:bg-gray-500 text-sm focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2">
              {c.name}
            </button>
          </a>
        </Link>
      );
    });
  };

  const showBlogTags = (blog) => {
    return blog.tags.map((t, i) => {
      return (
        <Link key={i} href={`/tags/${t.slug}`}>
          <a>
            <button className="cursor-pointer rounded-full tags text-white font-extrabold hover:bg-gray-500 text-sm focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2">
              {t.name}
            </button>
          </a>
        </Link>
      );
    });
  };

  const showRelatedBlog = () => {
    return related && related.length
      ? related.map((blog, i) => {
          return (
            <section>
              <div key={i}>
                <SmallCard blog={blog} />
              </div>
            </section>
          );
        })
      : null;
  };

  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={blog.id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article className="ml-3 mr-3">
            <div>
              <section>
                <h1 className="block text-gray-700 text-2xl mt-5 font-semibold pt-4">
                  {blog.title}
                </h1>
              </section>
              <section>
                <div>
                  Written by {blog.postedBy.name} | Published &nbsp;
                  {moment(blog.updatedAt).fromNow()}
                </div>
              </section>
              <div>
                <img src={blog.photo} alt={blog.title} />
              </div>
              <section className="flex mt-6 max-w-2xl justify-start mb-10">
                <div className="w-10 h-10 mr-4">
                  <img
                    src={insta}
                    className="rounded-full shadow-md"
                    alt="instagram"
                  />
                </div>
                <div className="w-10 h-10 mr-4">
                  <img
                    src={fb}
                    className="rounded-full shadow-md"
                    alt="facebook"
                  />
                </div>
                <div className="w-10 h-10 mr-4">
                  <img
                    src={tw}
                    className="rounded-full shadow-md"
                    alt="twitter"
                  />
                </div>
                <div className="w-10 h-10 mr-4">
                  <img
                    src={li}
                    className="rounded-full shadow-md"
                    alt="linkedin"
                  />
                </div>
                <div className="w-10 h-10 mr-4">
                  <img
                    src={wa}
                    className="rounded-full shadow-md"
                    alt="whatsapp"
                  />
                </div>
              </section>
              <div>
                <section>
                  <div>{renderHTML(blog.body)}</div>
                </section>
              </div>
              <section className="flex justify-end flex-row mb-2 mr-2">
                <div>{showBlogCategories(blog)}</div>
                <div>{showBlogTags(blog)}</div>
              </section>
            </div>
            <div>
              <h4>Related blogs</h4>
              <hr />
              {showRelatedBlog()}
            </div>
            <div>{showComments()}</div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = async ({ query }) => {
  const res = await singleBlog(query.slug);
  if (res.error) {
    console.log(res.error);
  } else {
    console.log("GET INITIAL PROPS", res);
    return { blog: res, query };
  }
};

export default SingleBlog;
