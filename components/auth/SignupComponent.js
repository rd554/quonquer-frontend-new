import React from "react";
import { useState } from "react";
import { signup, preSignup } from "../../actions/auth";
import Link from "next/link";
import Router from "next/router";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ name, email, password, error, laoding, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    let res = await preSignup(user);
    if (res.error) {
      console.log("res.error", res.error);
      return;
    }
    setValues({
      ...values,
      name: "",
      email: "",
      password: "",
      error: "",
      loading: false,
      message: res.message,
      showForm: false,
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? (
      <div
        className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
        role="alert"
      >
        Loading...
      </div>
    ) : (
      ""
    );

  const showError = () =>
    error ? (
      <div
        className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
        role="alert"
      >
        {error}
      </div>
    ) : (
      ""
    );

  const showMessage = () =>
    message ? (
      <div
        className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3"
        role="alert"
      >
        {message}
      </div>
    ) : (
      ""
    );

  const signupForm = () => {
    return (
      <div>
        <Link href="/" legacyBehavior>
          <a>
            <img src="/back.png" alt="back" className="w-6 h-6 mr-3 mt-4 ml-1"></img>
          </a>
        </Link>
        <div className="w-24 content-center mx-auto">
          <img
            src="/f.png"
            className="rounded-full shadow-md border-2 border-white-500"
            alt="quonquer"
          />

          <p className="text-black mt-3 text-xl -px-2 text-center font-medium uppercase">
            Welcome
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="m-auto self-center text-center mt-8 "
        >
          <p className="block text-gray-900 mt-2 mb-2 text-center pl-12 pr-64 font-semibold">
            Name
          </p>
          <div>
            <input
              value={name}
              onChange={handleChange("name")}
              type="text"
              className="text-gray-700 mt-1 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-64 px-2 py-2"
              placeholder="Your name"
            />
          </div>

          <p className="block text-gray-900 mt-4 text-center pl-10 pr-64 font-semibold">
            Email
          </p>
          <div>
            <input
              value={email}
              onChange={handleChange("email")}
              type="email"
              className="text-gray-700 mt-1 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-64 px-2 py-2"
              placeholder="Your email"
            />
          </div>

          <p className="block text-gray-900 mt-4 text-center pr-56 pl-10 font-semibold">
            Password
          </p>
          <div>
            <input
              value={password}
              onChange={handleChange("password")}
              type="password"
              className="text-gray-700 mt-1 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-64 px-2 py-2"
              placeholder="Your password"
            />
          </div>
          <input
            type="submit"
            value="Sign up"
            className="inline-block dark-blue
          text-white px-5 py-3 mt-8 uppercase tracking-wider
          text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          />
        </form>
      </div>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
