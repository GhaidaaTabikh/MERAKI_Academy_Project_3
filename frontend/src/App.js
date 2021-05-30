import React, { useState } from "react";
import { Route, Switch, Redirect , useHistory } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import NewArticle from "./components/NewArticle/NewArticle";

export default function App() {
  const [token, setToken] = useState("");
  const History = useHistory()
  return (
    <div className="App">
      <Header token={token} />

      <Route path="/dashboard" component={Dashboard} />

      <Route path="/login" render={() => <Login setToken={setToken} />} />

      <Route path="/register" component={Register} />

      {token ? <Redirect to="/dashboard" /> : null}

      <Route path="/newArticle" render={()=> <NewArticle  token={token}/>}  />
    </div>
  );
}
