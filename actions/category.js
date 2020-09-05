import fetch from "isomorphic-fetch";
import { API } from "../config";

export const create = async (category, token) => {
  try {
    console.log(category);
    const response = await fetch(`${API}/api/category`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    let data = await response.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API}/api/categories`, {
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

export const singleCategory = async (slug) => {
  try {
    const response = await fetch(`${API}/api/category/${slug}`, {
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

export const removeCategory = async (slug, token) => {
  try {
    console.log(category);
    const response = await fetch(`${API}/api/category/${slug}`, {
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
