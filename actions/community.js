import fetch from "isomorphic-fetch";
import { API } from "../config";

export const createQuestion = async (question, token) => {
  try {
    console.log("question", question);

    console.log("token", token);

    const response = await fetch(`${API}/api/community/postQuestion`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question }),
    });
    let data = await response.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createAnswer = async (answer, token, questionId) => {
  try {
    console.log(answer, questionId);
    const response = await fetch(`${API}/api/community/postAnswer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answer, questionId }),
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

export const getAllQuestionList = async () => {
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

export const updateQuestion = async (question, token, questionId) => {
  try {
    console.log("question", question);
    const response = await fetch(`${API}/api/community/updateQuestion`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question, questionId }),
    });
    let data = await response.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updateAswer = async (answer, token, questionId) => {
  try {
    const response = await fetch(`${API}/api/community/updateAnswer`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answer, questionId }),
    });
    let data = await response.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const removeQuestion = async (question, token) => {
  try {
    console.log(question);
    const response = await fetch(`${API}/api/community/deleteQuestion`, {
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

export const removeAnswer = async (answer, token, questionId) => {
  try {
    console.log(answer, questionId);
    const response = await fetch(`${API}/api/community/deleteAnswer`, {
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

export const getSingleQuestion = async (questionId) => {
  try {
    const response = await fetch(
      `${API}/api/community/getSingleQuestion/${questionId}`,
      {
        method: "GET",
      }
    );
    let data = await response.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
