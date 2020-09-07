import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Link from "next/link";
import back from "../../public/back.png";
import logo from "../../public/app_img.jpg";
import Router from "next/router";
import LoginGoogle from "./LoginGoogle";

const LoginComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ name, email, password, error, laoding, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    let res = await signin(user);
    if (res.error) {
      console.log("res.error", res.error);
      return;
    } else {
      // save user token to cookie
      // save user info to localStorage
      authenticate(res, () => {
        if (isAuth() && isAuth().role === 1) {
          Router.push("/admin");
        } else {
          Router.push("/");
        }
      });
    }
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

  const signinForm = () => {
    return (
      <div>
        <Link href="/">
          <img src={back} alt="back" className="w-6 h-6 mr-3 mt-4 ml-1"></img>
        </Link>
        <div className="w-24 content-center mx-auto">
          <img
            src={logo}
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
            value="Sign in"
            className="inline-block dark-blue
          text-white px-5 py-3 mt-8 uppercase tracking-wider
          text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          />
          <div className="flex mt-8 pr-20">
            <div className="flex-1 ml-6 text-gray-700 text-xs transition ease-in-out">
              <p>
                New User? &nbsp;
                <span>
                  <Link href="/signup">
                    <a className="text-blue-500">Signup</a>
                  </Link>
                </span>
              </p>
            </div>
            <Link href="/auth/password/forgot">
              <a>
                <p className="flex-1 text-blue-500 text-xs">Forgot Password?</p>
              </a>
            </Link>
          </div>
        </form>
      </div>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
      {/** // <LoginGoogle />*/}
    </React.Fragment>
  );
};

export default LoginComponent;
