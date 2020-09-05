import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Layout from "../../../../components/Layout";
import { withRouter } from "next/router";
import { signup } from "../../../../actions/auth";

const ActivateAccount = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    error: "",
    loading: false,
    success: false,
    showButton: true,
  });

  const { name, token, error, loading, success, showButton } = values;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, [router]);

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    signup({ token }).then((res) => {
      if (res.error) {
        setValues({
          ...values,
          error: res.error,
          loading: false,
          showButton: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          showButton: false,
        });
      }
    });
  };

  const showLoading = () => (loading ? <div>loading</div> : "");

  return (
    <Layout>
      <div>
        Hey {name}, Ready to activate your account?
        {showLoading()}
        {error && error}
        {success &&
          "You have successfully activated your account. Please signin"}
        {showButton && <button onClick={clickSubmit}>Activate Account</button>}
      </div>
    </Layout>
  );
};

export default withRouter(ActivateAccount);
