import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { QuillModules, QuillFormats } from "../../helpers/quill";
import { API } from "../../config";

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState("");

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); //categories
  const [checkedTag, setCheckedTag] = useState([]); //tags

  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    title: "",
    body: "",
  });

  const { error, success, formData, title } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setValues({ ...values, title: res.title });
          setBody(res.body);
          setCategoriesArray(res.categories);
          setTagsArray(res.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let ca = [];
    blogCategories.map((c, i) => {
      ca.push(c._id);
    });
    setChecked(ca);
  };

  const setTagsArray = (blogTags) => {
    let ta = [];
    blogTags.map((t, i) => {
      ta.push(t._id);
    });
    setChecked(ta);
  };

  const initCategories = () => {
    getCategories().then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
      } else {
        setCategories(res);
      }
    });
  };

  const initTags = () => {
    getTags().then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
      } else {
        setTags(res);
      }
    });
  };

  const handleToggle = (c) => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set("categories", all);
  };

  const handleTagsToggle = (t) => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set("tags", all);
  };

  const findOutCategory = (c) => {
    const result = checked.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findOutTag = (t) => {
    const result = checkedTag.indexOf(t);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const showCategories = () => {
    return (
      <div className="ml-auto mr-auto">
        <div className="flex flex-wrap p-2">
          {categories &&
            categories.map((c, i) => (
              <div key={i} className="text-gray-700 text-center p-2">
                <input
                  onChange={handleToggle(c._id)}
                  checked={findOutCategory(c._id)}
                  type="checkbox"
                  className="mt-2"
                />
                <p>{c.name}</p>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const showTags = () => {
    return (
      <div className="ml-auto mr-auto">
        <div className="flex flex-wrap p-2">
          {tags &&
            tags.map((t, i) => (
              <div key={i} className="text-gray-700 text-center p-2">
                <input
                  onChange={handleTagsToggle(t._id)}
                  checked={findOutTag(t._id)}
                  type="checkbox"
                  className="mt-4"
                />
                <p>{t.name}</p>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
  };

  const editBlog = () => {
    // console.log("update blog");
    e.preventDefault();
    updateBlog(formData, token, router.query.slug).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
      } else {
        setValues({
          ...values,
          title: "",
          success: `Blog titled '${res.title}' is successfully updated`,
        });
        if (isAuth() && isAuth().role === 1) {
          Router.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 0) {
          Router.replace(`/user`);
        }
      }
    });
  };

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const updateBlogForm = () => {
    return (
      <div className="ml-3 mr-3">
        <form onSubmit={editBlog}>
          <p className="block text-gray-700 text-xl mt-4 font-semibold">
            Title
          </p>
          <div>
            <input
              value={title}
              onChange={handleChange("title")}
              type="text"
              className="text-gray-700 mt-2 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-full px-2 py-2"
              placeholder="blog title"
            />
          </div>
          <div className="block text-gray-700 text-lg mt-4 focus:outline-none focus:shadow-outline transition shadow-md rounded font-base">
            <ReactQuill
              modules={QuillModules}
              formats={QuillFormats}
              value={body}
              placeholder="Write something amazing..."
              onChange={handleBody}
            />
          </div>
          <button
            type="submit"
            className="inline-block dark-blue
       text-white px-5 py-3 mt-4 uppercase tracking-wider
       text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          >
            Update
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      <div>{updateBlogForm()}</div>
      <div>
        {body && (
          <img src={`${API}/blog/photo/${router.query.slug}`} alt={title} />
        )}
        <div>
          <div className="ml-3 mr-3 mt-4 font-base">
            <h5>Featured Image</h5>
            <hr />
            <label className="text-blue-500 text-sm">
              Upload featured Image &nbsp;
              <input
                onChange={handleChange("photo")}
                type="file"
                accept="image/*"
                hidden
              />
            </label>
            <small className="text-gray-600">(max size: 1 MB)</small>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-4">
          <div className="ml-3 mr-3">
            <h5>Categories</h5>
          </div>
          <hr />
          <ul>{showCategories()}</ul>
          <h5 className="ml-3 mr-3 mt-4">Tags</h5>
          <hr />
          <ul>{showTags()}</ul>
        </div>
      </div>
    </>
  );
};

export default withRouter(BlogUpdate);
