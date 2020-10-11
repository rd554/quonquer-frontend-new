import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { API } from "../config";
import Router from "next/router";

export const handleResponse = (response) => {
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: "/signin",
        query: {
          message: "Your session expired. Please signin!",
        },
      });
    });
  } else {
    return;
  }
};

export const preSignup = async (user) => {
  try {
    console.log(user);
    const response = await fetch(`${API}/api/pre-signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const signup = async (user) => {
  try {
    console.log(user);
    const response = await fetch(`${API}/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const signin = async (user) => {
  try {
    console.log(user);
    const response = await fetch(`${API}/api/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${API}/api/signout`, {
      method: "GET",
    })
    .then (response => {
      console.log('signout success')
    })
    .catch(err => console.log(err))
};

// set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

// localStorage
export const setLocalStorage = (key, value) => {
  console.log(process.browser);
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authenticate user by pass data to cookie and localStorage
export const authenticate = (res, next) => {
  setCookie("token", res.token);
  setLocalStorage("user", res.user);
  setCookie("user", res.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user") != "undefined") {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem('user')) {
      let auth = JSON.parse(localStorage.getItem('user'))
      auth = user;
      localStorage.setItem('user', JSON.stringify(auth))
      next()
    }
  }
}



export const forgotPassword = async (email) => {
  try {
    console.log(email);
    const response = await fetch(`${API}/api/forgot-password`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const resetPassword = async (resetInfo) => {
  try {
    console.log(resetInfo);
    const response = await fetch(`${API}/api/reset-password`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetInfo),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const loginWithGoogle = async (user) => {
  try {
    console.log(user);
    const response = await fetch(`${API}/api/google-login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
