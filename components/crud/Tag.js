import { useState, useEffect } from "react";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getTags } from "../../actions/tag";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = async () => {
    const tag = { name };

    let res = await getTags(tag);
    if (res.error) {
      console.log("res.error", res.error);
      return;
    } else {
      console.log(res);
      setValues({ ...values, tags: res });
    }
  };

  const showTags = () => {
    return (
      <div className="rounded shadow-md bg-gray-100 w-full min-w-full hor-list-nobar overflow-x-auto whitespace-no-wrap py-3 px-2">
        {tags.map((t, i) => {
          return (
            <button
              key={i}
              className="curosr-pointer rounded-full bg-gray-400 text-gray-700 font-extrabold hover:bg-gray-500 text-md focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2"
            >
              {t.name}
            </button>
          );
        })}
      </div>
    );
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    // console.log("create category", name);
    setValues({ ...values, name: "", error: false, success: false });
    const tag = { name };

    let res = await create(tag, token);
    if (res.error) {
      console.log("res.error", res.error);
      return;
    }
    setValues({
      ...values,
      error: "",
      categories: [...tags, res],
      success: true,
      removed: !removed,
      name: "",
      reload: !reload,
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const showSuccess = () => {
    if (success) {
      return (
        <div
          className="flex items-center text-green-500 text-sm font-bold px-4 py-3"
          role="alert"
        >
          <p>Tag is created!</p>
        </div>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div
          className="flex items-center text-red-500 text-sm font-bold px-4 py-3"
          role="alert"
        >
          <p>Tag already created!</p>
        </div>
      );
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };

  const newTagForm = () => {
    return (
      <div className="ml-6 mr-6">
        <form onSubmit={clickSubmit}>
          <p className="block text-gray-700 mt-8 mb-2 ml-12 font-semibold">
            Name
          </p>
          <div className="w-full">
            <input
              type="text"
              className="text-gray-700 mt-1 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded px-2 py-2 ml-12"
              onChange={handleChange}
              value={name}
              placeholder="tag"
              required
            />
          </div>
          <input
            type="submit"
            value="Create"
            className="inline-block dark-blue
          text-white px-4 py-3 mt-6 ml-12 uppercase tracking-wider
          text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          />
        </form>
      </div>
    );
  };

  return (
    <>
      {showSuccess()}
      {showError()}

      <div onMouseMove={mouseMoveHandler}>{newTagForm()}</div>
      <div className="mt-4 px-2">{showTags()}</div>
    </>
  );
};

export default Tag;
