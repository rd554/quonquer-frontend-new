import fetch from "isomorphic-fetch";
import { API } from "../config";

export const createQuestion = async (question, token) => {
  try {
    console.log(question);
    const response = await fetch(`${API}/api/community/question`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(question),
    });
    let data = await response.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createAnswer = async (answer, token) => {
  try {
    console.log(answer);
    const response = await fetch(`${API}/api/community/answer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(answer),
    });
    let data = await response.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const listAllCards = async (skip, limit) => {
  try {
    const d = {
      limit,
      skip,
    };
    const response = await fetch(`${API}/api/community-questions-answers`, {
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

export const list = async () => {
  try {
    const response = await fetch(`${API}/api/community`, {
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
