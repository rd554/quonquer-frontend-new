import React from "react";
import Link from "next/link";
import parse from 'html-react-parser';
import { useState, useEffect } from "react";
import { listSearch } from "../../actions/blog";
import SearchButton from "../../public/svg/loupe.svg";

const SearchBlog = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
  });

  const { search, results, searched, message } = values;

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((res) => {
      if (res.error) {
        console.log(res.error);
        setValues({
          ...values,
          results: [],
          searched: false,
          message: "",
        });
        return;
      }
      setValues({
        ...values,
        results: res,
        searched: true,
        message: `${res.length} blogs found`,
      });
    });
  };

  const handleChange = (e) => {
    // console.log(e.target);
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <div>
        {message && <p>{message}</p>}
        {results.map((blog, i) => {
          return (
            <div key={i}>
              <Link href={`/blogs/${blog.slug}`} legacyBehavior>
                <a className="text-blue-500 text-xl">{blog.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  // const blogsNotFound = () => {
  //   return <h1>Blogs not found</h1>;
  // };

  const niceOne = () => {
    return (
      <React.Fragment>
        <div>
          <div className="flex w-full flex-wrap content-center pr-3 mt-4">
            <Link href="/" legacyBehavior>
              <a>
              <img
                  src="/back.png"
                alt="back"
                className="w-6 h-6 mr-3 mt-4 ml-1"
              ></img>
              </a>
            </Link>
            <div className="text-center shadow rounded-lg flex flex-1 h-12 mt-2">
              <input
                className="bg-white focus:outline-none focus:shadow-outline py-1 px-4 
block w-full appearance-none leading-normal rounded  text-lg"
                type="text"
                placeholder="Search Quonquer"
                onChange={handleChange}
              />
              <img
                src={SearchButton}
                onClick={searchSubmit}
                alt="Search"
                type="submit"
                className="pl-3 pr-3"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {niceOne()}
      <div className="mx-3 mt-3">{searched && searchedBlogs(results)}</div>
    </React.Fragment>
  );
};
export default SearchBlog;
