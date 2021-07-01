// import React, { Component, useState, useEffect } from "react";
// import React, { Component } from "react";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import logo from './Logo.png';
import './App.css'
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
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="css-selector">
    <div className="cssBar">  
      {/* all from bootstrap documentation*/}
      <Navbar className="navbar navbar-expand" variant="dark" id="navbarCss">
        <Navbar.Brand style={{marginLeft: "3%", marginTop: "1%"}}>
          <a href="/login" className="navbar-brand">
          <img 
            alt=""
            src={logo}
            height="65"
            width="auto"
            className="d-inline-block align-top"
            style={{paddingRight: "3%"}}
            />
            {/* <a>Campaign Portal</a> */}
          </a>
          {/* <Button variant="primary" onClick={handleShow}>
            Launch
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body> */}
          <div className="navbar-nav mr-auto" id="navStuff">
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
      {/* </Offcanvas.Body>
      </Offcanvas> */}
          </Navbar.Brand>
      </Navbar>
      </div>
    <div className="container mt-3">
      <Switch>
      <UnauthenticatedRoute
          path="/login"
          render={(props) => (
            <Login {...props} login={login} />
          )}
          appProps={{ isAuthenticated }}
        />
        <AuthenticatedRoute 
          exact path={["/", "/campaigns"]} 
          component={CampaignsList} 
          appProps={{ isAuthenticated }}
        />
        <AuthenticatedRoute
          path="/campaigns/:id/influencer"
          render={(props) => (
            <AddInfluencer {...props} user={user} />
          )}
          appProps={{ isAuthenticated }}
        />
        <AuthenticatedRoute
          path="/campaigns/:id"
          render={(props) => (
            <Campaign {...props} user={user} />
          )}
          appProps={{ isAuthenticated }}
        />
        {/* <Route
          path="/campaigns/addCampaign/:id"
          render={(props) => (
            <NewCampaign {...props} campaign={props.campaign} />
          )}
        /> */}
        <AuthenticatedRoute
          path="/addCampaign"
          render={(props) => (
            <NewCampaign {...props} user={user} />
          )}
          appProps={{ isAuthenticated }}
        />
        <AuthenticatedRoute
          path="/add-user"
          render={(props) => (
            <AddUser {...props} user={user} />
          )}
          appProps={{ isAuthenticated }}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
    <style type="text/css">
    {/* {`
    
    #navStuff{
      float: right;
      text-align: right;
      color:white;
      margin-top: %;
      padding-bottom: 3%;
      margin-right: auto;
    }
    `} */}
</style>
</div>
    

  );
}




export default App;
