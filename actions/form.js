import fetch from "isomorphic-fetch";
import { API } from "../config";

export const emailContactForm = async () => {
  try {
    const response = await fetch(`${API}/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let data = await response.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
