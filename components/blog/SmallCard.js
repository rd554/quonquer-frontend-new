import Link from "next/link";
import {smartTrim} from '../../helpers/title'
import renderHTML from "react-render-html";


const smallCard = ({ blog }) => {
  const {title} = blog
  blog.title = smartTrim(title, 25, " ", " ...");
  return (
    <div>
      <div className="cursor-pointer rounded mt-4 ml-3 mr-3 shadow-lg bg-white align-top my-2">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <img
                className="w-full rounded"
                style={{ maxHeight: "auto", width: "auto" }}
                src={blog.photo}
                alt={blog.title}
              />
              <div className="mx-2">
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
                <a className="text-gray-700">{renderHTML(blog.excerpt)}</a>
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
