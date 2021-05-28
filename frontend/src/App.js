import React, { useState } from "react";
import { Route, Switch ,Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
  const [token, setToken] = useState("");
  return (
    <div className="App">
      <Header token={token} />
     
        <Route path="/dashboard" component={Dashboard} />
      
        <Route path="/login" render={() => <Login setToken={setToken} />} />
      

      <Route path="/register" component={Register} />


      {token ? <Redirect to="/dashboard" /> :null }


    </div>
  );
}
