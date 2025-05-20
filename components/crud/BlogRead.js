import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const BlogRead = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setBlogs(res);
      }
    });
  };

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setMessage(res.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete");
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a
            className="inline-block dark-blue
          text-white px-2 py-2 uppercase tracking-wider 
          text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          >
            Update
          </a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <a
            className="inline-block dark-blue
          text-white px-2 py-2 uppercase tracking-wider 
          text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          >
            Update
          </a>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i}>
          {blog.title}
          <p>
            Written by {blog.postedBy.name} | Published on &nbsp;
            {moment(blog.updatedAt).fromNow()}
          </p>
          <button
            onClick={() => deleteConfirm(blog.slug)}
            className="inline-block dark-blue
          text-white px-2 py-2 uppercase tracking-wider 
          text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          >
            Delete
          </button>
          {showUpdateButton(blog)}
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div>{showAllBlogs()}</div>
    </React.Fragment>
  );
};

export default BlogRead;
