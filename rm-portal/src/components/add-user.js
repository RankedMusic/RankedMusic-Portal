import React, { useState } from "react";
import CampaignDataService from "../services/campaign";
import { Link } from "react-router-dom";
import { Form, Row, Col, FormControl, Button } from 'react-bootstrap';

// function AddUser(props) {
const AddUser = props => {
  let initialUserState = {
    username: "",
    password: "",
  }
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
    
  const [username, setUsername] = useState(initialUserState.username);
  const [password, setPassword] = useState(initialUserState.pass);
//   keeping track of whether submitted or not
  const [submitted, setSubmitted] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
  //   var data = {
  //     username: props.user.username,
  //     password: props.user.pass,
  //   };
    const data = {
      username: username,
      password: password
    };
    // const response = await fetch("http://localhost:5000/api/v1/campaigns/add-user", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   credentials: "include",
    //   headers: { "Content-Type": "application/json" },
    // });

  //   setUsername("");
  //   setPassword("");

    // const responseObj = await response.json();
    // console.log(responseObj.message);
    // console.log(response.status);
    // if (response.status === 200) {
    //   props.setLoggedIn(true);
    //   props.setOpenReg(false);
    // }
  
  
    CampaignDataService.createUser(data)
    .then(response => {
      setSubmitted(true);
      console.log(response.data);
      props.history.push('/campaigns')
    })
    .catch(e => {
      console.log(e);
    });
  }


  const handleNameChange = event => {
    setUsername(event.target.value);
  };
  const handlePassChange = event => {
    setPassword(event.target.value);
  };
  // const handleRegister = () => {
  //   var data = {
  //     username: props.user.username,
  //     password: props.user.pass,
  //   };

    // if (editing) {
    //   data._id = props.location.state.currentInfluencer._id
    //   CampaignDataService.updateInfluencer(data)
    //     .then(response => {
    //       setSubmitted(true);
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // } 
    // else {
  


  return (
    <div className="addUser">
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="validationUname">
            <Form.Label>Username</Form.Label>
            <FormControl
                // className="form-control"
                type="text"
                username="text"
                required
                value={username}
                placeholder="Set Username"
                // onChange={(event) => setUsername(event.target.value)}
                onChange={handleNameChange}
            />
            <Form.Control.Feedback>Great!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationPassword">
            <Form.Label>Password</Form.Label>
            <FormControl
                // className="form-control"
                // type="password"
                // placeholder="Password"
                // onChange={(event) => setPassword(event.target.value)}
                type="text"
                password="text"
                required
                value={password}
                placeholder="Password"
                // pass="text"
                // required
                // value={pass}
                onChange={handlePassChange}
                // placeholder="Set Password"
            />
            <Form.Control.Feedback>Great!</Form.Control.Feedback>
        </Form.Group>
        <Button variant="outline-dark" type="submit">Register</Button>
      </Form>


        {/* check to see if user (if no -> wont submit + say pls log in) */}
      {/* {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>User successfully added!</h4>
            <Link to={"/campaigns/" + props.match.params.id} className="btn btn-success">
              Back to Campaigns
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group"> */}
                {/* if edit true or false */}
              {/* <br/>
              <h4><label htmlFor="description">{ editing ? "Edit" : "Add" } User</label></h4>
              <br/>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={influencer}
                onChange={handleNameChange}
                name="text"
                placeholder="Link to Tik-Tok Video "
              />
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={influencer}
                onChange={handlePassChange}
                name="text"
                placeholder="Link to Tik-Tok Video "
              />
              <br/>
            </div>
            <Button onClick={saveUser} variant="outline-dark">
              Submit
            </Button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )} */}

    </div>
  );
}

export default AddUser;