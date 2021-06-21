import React, { useEffect, useState } from "react";
import { Form, Row, Col, FormControl, Button } from 'react-bootstrap';
// import GetLogin from '.../backend/api/users.controller'
import CampaignDataService from "../services/campaign";
import Alert from 'react-bootstrap/Alert';

const Login = props => {
    
    const initialUserState = {
        id: "",
        username:"",
        password:"",
    };
    // create blank user
    const [userID, setUser] = useState(initialUserState.id);
    const[username, setUsername] = useState(initialUserState.username);
    const[password, setPassword] = useState(initialUserState.password);
    const [popUp, setError] = React.useState(null);

    async function isWrong(popUp = null) {
        setError(true);
        console.log(popUp);
    }

    async function isRight() {
        setError(null)
    }
    // handle input changes
    // const handleLogin = event => {
    //     const { username, value } = event.target;
    //     setUser({ ...user, [username]: value });
    // };
    const handleID = event => {
        const { userID, value } = event.target;
        setUser({ ...userID, [userID]: value });
    }
    const handleUser = e => {
        const username = e.target.value;
        setUsername(username);
      };
    const handlePass = e => {
        const password= e.target.value;
        setPassword(password);
    }
    async function handleLogin(event){
        event.preventDefault();
        const login_object = {
            username: username,
            passwordAttempt: password
        }
        CampaignDataService.loginUser(login_object)
            .then(response => {
                if(response.data.status == "success"){
                    isRight();
                    props.login(login_object.username);
                    props.history.push('/campaigns')
                }
                else{
                    console.log("bad");
                    isWrong();
                }
            });


            // { user ? (
            //     
            //   ) : (
            //     <li></li>
            //   )}
        // const who = CampaignDataService.saveUser();

    }
    return (

            <div>
                { popUp ? (
                    <Alert variant='danger' show='true'>
                        Incorrect Username or Password. Please try again
                    </Alert>
                ) : (
                    <ul></ul>
                    )}


                        
                    {/* </div>
        
            <div> */}
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="validationUname">
                    <Form.Label>Username</Form.Label>
                    <FormControl
                        required
                        type="text"
                        className="form-control"
                        username="text"
                        required
                        value={username}
                        onChange={handleUser}
                        placeholder="Enter Your Username"
                    />
                    <Form.Control.Feedback>Great!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationPassword">
                    <Form.Label>Password</Form.Label>
                    <FormControl
                        required
                        type="text"
                        className="form-control"
                        password="text"
                        required
                        value={password}
                        onChange={handlePass}
                        placeholder="Enter Your Password"
                    />
                    <Form.Control.Feedback>Great!</Form.Control.Feedback>
                </Form.Group>
                <Button variant="outline-dark" type="submit">Login</Button>
            </Form>




        </div>
  );
};


export default Login;