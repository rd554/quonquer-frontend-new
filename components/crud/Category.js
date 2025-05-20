import React from "react";
import { useState, useEffect } from "react";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getCategories } from "../../actions/category";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = async () => {
    const category = { name };

    let res = await getCategories(category);
    if (res.error) {
      console.log("res.error", res.error);
      return;
    } else {
      console.log(res);
      setValues({ ...values, categories: res });
    }
  };

  const showCategories = () => {
    return (
      <div className="rounded shadow-md bg-gray-100 w-full min-w-full hor-list-nobar overflow-x-auto whitespace-no-wrap py-3 px-2">
        {categories.map((c, i) => {
          return (
            <button
              key={i}
              className="cursor-pointer rounded-full bg-gray-400 text-gray-700 font-extrabold hover:bg-gray-500 text-md focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2"
            >
              {c.name}
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
    const category = { name };

    let res = await create(category, token);
    if (res.error) {
      console.log("res.error", res.error);
      return;
    }
    setValues({
      ...values,
      error: "",
      categories: [...categories, res],
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
          <p>Category is created!</p>
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
          <p>Category already created!</p>
        </div>
      );
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };

  const newCategoryForm = () => {
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
              placeholder="category"
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

      <div onMouseMove={mouseMoveHandler}>{newCategoryForm()}</div>
      <div className="mt-4 px-2">{showCategories()}</div>
    </>
  );
};

export default Category;
