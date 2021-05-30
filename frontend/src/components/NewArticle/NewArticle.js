import React, { useState } from "react";
import axios from "axios";
// import {  } from "react-router-dom"

export default function NewArticle({ token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  token = JSON.parse(localStorage.getItem("token"));
  const newFun = () => {
    console.log("===============");
    axios
      .post(
        "http://localhost:5000/articles",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: "Bearer" + token,
          },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          setMessage("the article has been created successfully ");
        } else {
          setMessage("Error happened when creating article , try again");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="article title here"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="article description here"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button onClick={newFun}>Create New Article</button>
      <p>{message}</p>
    </div>
  );
}
