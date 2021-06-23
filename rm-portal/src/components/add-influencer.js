import React, { useEffect, useState, useRef } from "react";
import CampaignDataService from "../services/campaign";
import { Link } from "react-router-dom";
import { Form, Row, Col, FormControl, Button } from 'react-bootstrap';


const AddInfluencer = props => {
  // event.preventDefault();
  let initialInfluencerState = "";
    // keep track of whether new influencer or editing influencer -> defaulting to adding influencer
  let editing = false;
    // see if current influencer was passed into the component (to see if editing -> state is passed in from rest.js)
  // if (props.location.state && props.location.state.currentInfluencer) {
  //   editing = true;
  //   initialInfluencerState = props.location.state.currentInfluencer.text
  // }

  const [influencer, setInfluencer] = useState(initialInfluencerState);
//   keeping track of whether submitted or not
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [finishedGrab, setFinishedGrab] = useState(false);
  const isFirstRun = useRef(true);


  //NOTE SET USERNAME AND AVATAR AND THEN PASS INTO THE USE EFFECT AND THEN INPUT ALL OF IT INTO DATABASE
  async function saveInfluencer(event) {
    event.preventDefault();
    var data = {
      influencer: influencer,
      // name: props.user.name,
      // user_id: props.user.id,
    //   getting right from url
      campaign_id: props.match.params.id
    };
    console.log(data);
    // if (editing) {
    //   data.influencer_id = props.location.state.currentInfluencer._id
    //   CampaignDataService.updateInfluencer(data)
    //     .then(response => {
    //       setSubmitted(true);
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // } else {
      


        CampaignDataService.saveUsername(data)
        .then(response => {

          setUsername(response.data);
          // console.log(response.data);
            CampaignDataService.saveAvatar(data)
          .then(response => {
            setAvatar(response.data);
            // console.log(response.data);
            setFinishedGrab(true)
          })
          .catch(e => {
            console.log(e);
          });
        })
        .catch(e => {
          console.log(e);
        });

        
    }

  

    useEffect(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      var data = {
        influencer: influencer,
        // name: props.user.name,
        // user_id: props.user.id,
      //   getting right from url
        campaign_id: props.match.params.id,
        influencer_user: username,
        avatar: avatar
      };
      // console.log(data)
      CampaignDataService.createInfluencer(data)
        .then(response => {
          setSubmitted(true);
          // console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }, [finishedGrab]);

  const handleInfluencerChange = event => {
    // event.preventDefault();
    setInfluencer(event.target.value);
  };

  return (
    <div className="addInf">
        {/* check to see if user (if no -> wont submit + say pls log in) */}
      {/* {props.user ? ( */}
      {/* <div className="submit-form"> */}
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/campaigns/" + props.match.params.id} className="btn btn-success">
              Back to Campaigns
            </Link>
          </div>
        ) : (
          <div>
            <Form onSubmit={saveInfluencer}>
              <Form.Group className="mb-3" controlId="validationInfluencer">
                  <h4><Form.Label htmlFor="description">{ editing ? "Edit" : "Upload" } Tik-Tok Influencer Video</Form.Label></h4>
                  <FormControl
                      // className="form-control"
                      type="text"
                      influencer="text"
                      required
                      value={influencer}
                      placeholder="Link to Tik-Tok Video"
                      // onChange={(event) => setUsername(event.target.value)}
                      onChange={handleInfluencerChange}
                  />
                  <Form.Control.Feedback>Great!</Form.Control.Feedback>
              </Form.Group>
              
              <Button variant="outline-dark" type="submit">Save Influencer</Button>
            </Form>
              {/* <input
                type="text"
                className="form-control"
                id="text"
                required
                value={influencer}
                onChange={handleInputChange}
                name="text"
                placeholder="Link to Tik-Tok Video "
              /> */}
            {/* <Button onClick={saveInfluencer} variant="outline-dark">
              Submit
            </Button> */}
          </div>
        )}
      {/* </div> */}

      {/* // ) : (
      // <div>
      //   Please log in.
      // </div>
      // )} */}

  </div>
  );
};

export default AddInfluencer;