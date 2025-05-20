import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import GoogleLogin from "react-google-login";
import { loginWithGoogle, authenticate, isAuth } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";

const LoginGoogle = () => {
  const responseGoogle = (response) => {
    console.log('Google response:', response); // Debug log
    const tokenId = response.tokenId;
    const user = { tokenId };

    loginWithGoogle(user).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        authenticate(res, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/");
          }
        });
      }
    });
  };

  return (
    <div className="text-center mt-12">
      <GoogleLogin
        clientId={`${GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};

export default LoginGoogle;
