import { useState } from "react";
import Layout from "../../../components/Layout";
import { forgotPassword } from "../../../actions/auth";
import Link from "next/link";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    message: "",
    error: "",
    showForm: true,
  });

  const { email, message, error, showForm } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, message: "", error: "", [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });
    forgotPassword({ email }).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
      } else {
        setValues({
          ...values,
          message: res.message,
          email: "",
          showForm: false,
        });
      }
    });
  };

  const showError = () => {
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
  };

  const showMessage = () => {
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
  };

  const passwordForgotForm = () => {
    return (
      <div className="m-auto text-center mt-12">
        <form onSubmit={handleSubmit}>
          <p className="block text-gray-900 pr-32 font-semibold">
            Forgot password
          </p>
          <div>
            <input
              type="email"
              onChange={handleChange("email")}
              value={email}
              className="text-gray-700 mt-6 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-64 px-2 py-2"
              placeholder="Type your email"
              required
            />
          </div>
          <div>
            <input
              type="submit"
              value="Reset link"
              className="inline-block dark-blue
        text-white px-5 py-3 mt-8 uppercase tracking-wider
        text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
            />
          </div>
        </form>
      </div>
    );
  };

  return (
    <Layout>
      <div>
        <Link href="/signin" legacyBehavior>
          <a>
            <img src="/back.png" alt="back" className="w-6 h-6 mr-3 mt-4 ml-1"></img>
          </a>
        </Link>
        <div>
          {showError()}
          {showMessage()}
          {showForm && passwordForgotForm()}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
