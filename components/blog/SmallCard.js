import Link from "next/link";
import renderHTML from "react-render-html";
import { API } from "../../config";

const smallCard = ({ blog }) => {
  return (
    <div className="rounded shadow-md bg-gray-100 w-full min-w-full hor-list-nobar overflow-x-auto whitespace-no-wrap py-3 px-2">
      <div className="cursor-pointer rounded mt-4 ml-3 mr-3 shadow-lg bg-white align-top my-2">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <img
                className="w-full rounded"
                style={{ maxHeight: "auto", width: "auto" }}
                src={`${API}/blog/photo/${blog.slug}`}
                alt={blog.title}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 whitespace-pre-wrap">
                  {blog.title}
                </div>
              </div>
            </a>
          </Link>
        </section>
        <div>
          <section className="ml-2 mr-2">
            <div>
              <Link href={`/blogs/${blog.slug}`}>
                <a>{renderHTML(blog.excerpt)}</a>
              </Link>
            </div>
            <div>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-blue-400">Read more</a>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default smallCard;
