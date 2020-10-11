import Link from "next/link";
import renderHTML from "react-render-html";
import { API } from "../../config";

const Card = ({ blog }) => {
  const showBlogCategories = (blog) => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a>
          <button className="cursor-pointer rounded-full categories text-white font-extrabold hover:bg-gray-500 text-sm focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2">
            {c.name}
          </button>
        </a>
      </Link>
    ));
  };

  const showBlogTags = (blog) => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a>
          <button className="cursor-pointer rounded-full tags text-white font-extrabold hover:bg-gray-500 text-sm focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2">
            {t.name}
          </button>
        </a>
      </Link>
    ));
  };

  return (
    <div className="cursor-pointer rounded mt-4 ml-3 mr-3 shadow-lg bg-white inline-block align-top my-2">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              className="w-full rounded"
              style={{ maxHeight: "auto", width: "auto" }}
              src={blog.photo}
              alt={blog.title}
            />
            <div className="px-2 py-4">
              <div className="font-bold text-xl mb-2 whitespace-pre-wrap">
                {blog.title}
              </div>
            </div>
          </a>
        </Link>
      </section>
      <div>
        <section className="mx-2">
          <div>
            <Link href={`/blogs/${blog.slug}`}>
              <a >{renderHTML(blog.excerpt)}</a>
            </Link>
          </div>
          <div>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="text-blue-400">Read more</a>
            </Link>
          </div>
        </section>
      </div>
      <section className="flex justify-end flex-row mb-2 mr-2">
        <div className="mt-2">{showBlogCategories(blog)} &nbsp;</div>
        <div className="mt-2">{showBlogTags(blog)}</div>
      </section>
    </div>
  );
};

export default Card;
