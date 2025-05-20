import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";

export const createBlog = async (blog, token) => {
  try {
    console.log(blog);
    const response = await fetch(`${API}/api/blog`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    let data = await response.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const listBlogsWithCategoriesAndTags = async (skip, limit) => {
  try {
    const d = {
      limit,
      skip,
    };
    const response = await fetch(`${API}/api/blogs-categories-tags`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const singleBlog = async (slug) => {
  try {
    console.log(slug);
    const response = await fetch(`${API}/api/blog/${slug}`, {
      method: "GET",
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const blogForHomePage = async () => {
  try {
    const response = await fetch(`${API}/api/blogForHomePage`, {
      method: "GET"
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching blog data:", err);
    return [];
  }
};

export const listRelated = async (blog) => {
  try {
    const response = await fetch(`${API}/api/blogs/related`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const list = async () => {
  try {
    console.log();
    const response = await fetch(`${API}/api/blogs`, {
      method: "GET",
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const removeBlog = async (slug, token) => {
  try {
    console.log(slug);
    const response = await fetch(`${API}/api/blog/${slug}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updateBlog = async (blog, token, slug) => {
  try {
    console.log(blog);
    const response = await fetch(`${API}/api/blog/${slug}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const listSearch = async (params) => {
  try {
    console.log("search params", params);
    let query = queryString.stringify(params);
    console.log("query params", query);
    const response = await fetch(`${API}/api/blogs/search?${query}`, {
      method: "GET",
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
