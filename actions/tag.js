import fetch from "isomorphic-fetch";
import { API } from "../config";

export const create = async (tag, token) => {
  try {
    console.log(tag);
    const response = await fetch(`${API}/api/tag`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tag),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getTags = async () => {
  try {
    const response = await fetch(`${API}/api/tags`, {
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

export const singleTag = async (slug) => {
  try {
    const response = await fetch(`${API}/api/tag/${slug}`, {
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

export const removeTag = async (slug, token) => {
  try {
    console.log(tag);
    const response = await fetch(`${API}/api/tag/${slug}`, {
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
