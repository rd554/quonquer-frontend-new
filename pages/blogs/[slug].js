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
  const baseURL = 'https://www.quonquer.com/blogs/'
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
            <section key={i}>
              <div key={i}>
              <p className="text-lg font-semibold">Related blogs</p>
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
          id={blog._id}
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
                <h1 className="block text-gray-900 text-2xl mt-5 font-semibold pt-4">
                  {blog.title}
                </h1>
              </section>
              <section>
                <div className="text-sm">
                  written by {blog.postedBy.name} | Published &nbsp;
                  {moment(blog.updatedAt).fromNow()}
                </div>
              </section>
              <div>
                <img src={blog.photo} alt={blog.title} />
              </div>
              <section className="flex mt-6 max-w-2xl justify-start mb-10">
              
              
<a className="resp-sharing-button__link" href={"https://facebook.com/sharer/sharer.php?u=" + baseURL + blog.slug} target="_blank" rel="noopener" aria-label="">
  <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
    </div>
  </div>
</a>


<a className="resp-sharing-button__link" href={"https://twitter.com/intent/tweet/?url=" + baseURL + blog.slug + '&text-' + blog.title + '&via' + 'twitterHandle'} target="_blank" rel="noopener" aria-label="">
  <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>
    </div>
  </div>
</a>


<a className="resp-sharing-button__link" href={"https://www.linkedin.com/shareArticle?url=" + baseURL + blog.slug} target="_blank" rel="noopener" aria-label="">
  <div className="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"/></svg>
    </div>
  </div>
</a>


<a className="resp-sharing-button__link" href={"whatsapp://send?&text=" + blog.title + baseURL + blog.slug} target="_blank" rel="noopener" aria-label="">
  <div className="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/></svg>
    </div>
  </div>
</a>


              
              </section>
              <div>
                <section>
                  <div className="text-gray-700">{renderHTML(blog.body)}</div>
                </section>
              </div>
              <section className="flex justify-end flex-row mb-2 mr-2">
                <div>{showBlogCategories(blog)}</div>
                <div>{showBlogTags(blog)}</div>
              </section>
            </div>
            <div>
              
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
    return { blog: res, query };
  }
};

export default SingleBlog;
