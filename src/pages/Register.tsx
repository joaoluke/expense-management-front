import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import API from "../services/connection";

export default function Register() {
  const responseGoogle = (response) => {
    API.post("/api/v1/auth/google-login/", {
      token: response.credential,
    })
      .then((response) => {
        getDataUser(response.data.access_token);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getDataUser = (token) => {
    axios
      .get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data, "SUCCESS");
      });
  };

  return (
    <GoogleOAuthProvider clientId="555207392392-dvbrnkgeqpu6jve3ri5ku4f5t5qqdtgl.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          responseGoogle(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}
