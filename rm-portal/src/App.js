// import React, { Component, useState, useEffect } from "react";
// import React, { Component } from "react";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import logo from './Logo.png';

import AddInfluencer from "./components/add-influencer";
import Campaign from "./components/campaigns";
import CampaignsList from "./components/campaigns-list";
import Login from "./components/login";
import AddUser from "./components/add-user";
import NewCampaign from "./components/addCampaign";



function App() {
  // React.useState = create a state variable that can be used in react app 
  // + setting initial value (null) to the user variable
  // setUser = method to update later
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
    console.log(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      {/* all from bootstrap documentation*/}
      <Navbar className="navbar navbar-expand navbar-dark bg-dark">
        <Navbar.Brand style={{marginLeft: "2%"}}>
          <a href="/login" className="navbar-brand">
          <img 
            alt=""
            src={logo}
            height="45"
            width="auto"
            className="d-inline-block align-top"
            style={{paddingRight: "3%"}}
            />
            <a>Ranked Music Portal</a>
          </a>
          <div className="navbar-nav mr-auto" style={{marginLeft: "4%"}}>
            { user ? (
              <li className="nav-item">
                <Link to={"/campaigns"} className="nav-link">
                  Campaigns
                </Link>
              </li>
            ) : (
              <li></li>
            )}
            { user ? (
              <ul className="nav-item">
                <Link to={"/addCampaign"} className="nav-link">
                  Add New Campaign
                </Link>
              </ul> 
            ) : (
              <ul></ul>
            )}
            { user ? (
              <ul className="nav-item">
                <Link to={"/add-user"} className="nav-link">
                  Create New User
                </Link>
              </ul>
            ) : (
              <ul></ul>
            )}
            <ul className="nav-item">
              { user ? (
                <a onClick={logout} href="/login" className="nav-link" style={{cursor:'pointer'}} >
                  Logout {user}
                </a>
              ) : (
                <Link to ={"/login"} className="nav-link">
                  Login
                </Link>
              )}
            </ul>
          </div>
          </Navbar.Brand>
      </Navbar>
    

    <div className="container mt-3">
      <Switch>
        <Route exact path={["/", "/campaigns"]} component={CampaignsList} />
        <Route
          path="/campaigns/:id/influencer"
          render={(props) => (
            <AddInfluencer {...props} user={user} />
          )}
        />
        <Route
          path="/campaigns/:id"
          render={(props) => (
            <Campaign {...props} user={user} />
          )}
        />
        <Route
          path="/login"
          render={(props) => (
            <Login {...props} login={login} />
          )}
        />
        <Route
          path="/addCampaign"
          render={(props) => (
            <NewCampaign {...props} user={user} />
          )}
        />
        <Route
          path="/add-user"
          render={(props) => (
            <AddUser {...props} user={user} />
          )}
        />
      </Switch>
    </div>
    

    </div>

  );
}




export default App;
