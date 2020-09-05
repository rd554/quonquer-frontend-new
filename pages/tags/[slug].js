import Head from "next/head";
import Link from "next/link";
import Card from "../../components/blog/Card";
import moment from "moment";
import renderHTML from "react-render-html";
import Layout from "../../components/Layout";
import { singleTag } from "../../actions/tag";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const Tag = ({ tag, blogs, query }) => {
  const head = () => {
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta name="description" content={`Mental health blogs on ${tag.name}`} />
      <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
      <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Mental health blogs on ${tag.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/public/images/instagram.png`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/public/images/instagram.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>;
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div>
            <header>
              <div>{tag.name}</div>
              {blogs.map((b, i) => (
                <Card key={i} blog={b} />
              ))}
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Tag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then((res) => {
    if (res.err) {
      console.log(res.error);
    } else {
      return { tag: res.tag, blogs: res.blogs, query };
    }
  });
};

export default Tag;
