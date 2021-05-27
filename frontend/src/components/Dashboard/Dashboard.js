import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="Dashboardcom">
      <div className="body">
        <p className="dash">Dashboard</p>
        <button className="buttonArticles">Get All Article</button>
      </div>
    </div>
  );
}
