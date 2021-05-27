import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header({token}) {
  return (
    <div className="Header">
{token ? <> <Link to="dashboard"> Dashboard </Link> 
      <Link to="newArticle"> New Article </Link>
       </>  : 
      <> <Link to="login"> Login </Link> 
      <Link to="register"> Register </Link></>}


     
     
    </div>
  )
}
