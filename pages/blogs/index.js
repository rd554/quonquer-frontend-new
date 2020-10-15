import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogSkip,
  router,
}) => {
  const head = () => {
    <Head>
      <title>Mental health blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Mental Health blogs and tutorials on how to live mental-illness free"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest mental health blogs | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Mental Health blogs and tutorials on how to live mental-illness free"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${APP_NAME}`} />
      <meta property="og:image:secure_url" content={`${APP_NAME}`} />
      <meta property="og:image:type" content={`${APP_NAME}`} />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>;
  };

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...res.blogs]);
        setSize(res.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          className="inline-block dark-blue
      text-white px-2 py-2 mt-3 mb-3 uppercase tracking-wider
      text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          onClick={loadMore}
        >
          load more
        </button>
      )
    );
  };

  const showLoadedBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          <Card blog={blog} />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return (
      <div className="rounded shadow-md bg-gray-100 ml-3 mr-3 hor-list-nobar overflow-x-auto whitespace-no-wrap py-3 px-2">
        {categories.map((c, i) => {
          return (
            <Link href={`/categories/${c.slug}`} key={i}>
              <a>
                <button className="cursor-pointer rounded-full categories text-white font-extrabold hover:bg-gray-500 text-sm focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2">
                  {c.name}
                </button>
              </a>
            </Link>
          );
        })}
      </div>
    );
  };

  const showAllTags = () => {
    return (
      <div className="rounded shadow-md bg-gray-100 ml-3 mr-3 mt-4 hor-list-nobar overflow-x-auto whitespace-no-wrap py-3 px-2">
        {tags.map((t, i) => (
          <Link href={`/tags/${t.slug}`} key={i}>
            <a className="ml-2">
              <button className="cursor-pointer rounded-full tags text-white font-extrabold hover:bg-gray-500 text-sm focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2">
                {t.name}
              </button>
            </a>
          </Link>
        ))}
      </div>
    );
  };

  const showAllBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="text-black pt-6 text-center font-black text-xl">
            <h2>All blogs</h2>
          </div>
          <section>
            <div>
              <p className="block ml-3 text-gray-700 text-lg mt-4 mb-2 font-semibold">
                All Categories
              </p>

              {showAllCategories()}
            </div>
            <div>
              <p className="block ml-3 text-gray-700 text-lg mt-6 mb-1 font-semibold">
                All Tags
              </p>

              {showAllTags()}
            </div>
          </section>
          <div>{showAllBlogs()}</div>
          <div>{showLoadedBlogs()}</div>
          <div className="text-center">{loadMoreButton()}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = async () => {
  let skip = 0;
  let limit = 4;
  const res = await listBlogsWithCategoriesAndTags(skip, limit);
  if (res.error) {
    console.log(res.error);
  } else {
    return {
      blogs: res.blogs,
      categories: res.categories,
      tags: res.tags,
      totalBlogs: res.size,
      blogsLimit: limit,
      blogSkip: skip,
    };
  }
};

export default withRouter(Blogs);
