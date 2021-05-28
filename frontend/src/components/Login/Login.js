import React, { useState } from "react";
import axios from "axios";

import "./Login.css";

import { Link, Redirect } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const loginFun = () => {
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
        setLoginMessage("login successful");
       
       
      })
      .catch((err) => {
        if (err == "Error: Request failed with status code 404") {
          setLoginMessage("The email doesn't exist");
        }
        if (err == "Error: Request failed with status code 403") {
          setLoginMessage("The password you entered incorrect");
        }
      });
  };

  return (
    <div className="login">
      <p className="paragraph">Login</p>
      <input
        type="text"
        placeholder="email here"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password here"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="loginButton" onClick={loginFun}>
        login
      </button>
      <p>{loginMessage}</p>
    </div>
  );
}
