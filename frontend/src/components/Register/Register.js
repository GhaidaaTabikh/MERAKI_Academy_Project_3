import React, { useState } from "react";
import "./Register.css";

import axios from "axios";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(1);
  const [country, setCountry] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerMessage, setRegisterMessage] = useState("");

  const postRegister = () => {
    console.log({ firstName, lastName, age, country, email, password });
    axios
      .post("http://localhost:5000/users", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.errors) {
          setRegisterMessage(
            "some thing happened while register, please try again"
          );
        } else {
          setRegisterMessage("The user has been created successfully");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="Register">
      <p className="paragraph">Register : </p>
      <div className="register">
        <input
          type="text"
          placeholder=" firstName here"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="lastName here."
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="age here"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="country here"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />

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
        <button className="button" onClick={postRegister}>
          Register
        </button>
        <p>{registerMessage}</p>
      </div>
    </div>
  );
}
