import { useState } from "react";
import Layout from "../../../../components/Layout";
import { withRouter } from "next/router";
import { forgotPassword, resetPassword } from "../../../../actions/auth";

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    newPassword: "",
    error: "",
    message: "",
    showForm: true,
  });

  const { name, newPassword, error, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id,
    }).then((res) => {
      if (res.error) {
        setValues({
          ...values,
          error: res.error,
          showForm: false,
          newPassword: "",
        });
      } else {
        setValues({
          ...values,
          message: res.message,
          showForm: false,
          newPassword: "",
          error: false,
        });
      }
    });
  };

  const passwordResetForm = () => {
    return (
      <div className="m-auto text-center mt-12">
        <form onSubmit={handleSubmit}>
          <p className="block text-gray-900 pr-32 font-semibold">
            Reset password
          </p>
          <div>
            <input
              type="password"
              onChange={(e) =>
                setValues({ ...values, newPassword: e.target.value })
              }
              value={newPassword}
              className="text-gray-700 mt-6 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-64 px-2 py-2"
              placeholder="Type your password"
              required
            />
          </div>
          <div>
            <input
              type="submit"
              value="Change Password"
              className="inline-block dark-blue
        text-white px-5 py-3 mt-8 uppercase tracking-wider
        text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
            />
          </div>
        </form>
      </div>
    );
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

  return (
    <Layout>
      <div>
        {showError()}
        {showMessage()}
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default withRouter(ResetPassword);
