import React, { useEffect, useState, useRef } from "react";
import CampaignDataService from "../services/campaign";
import { Link } from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Dropdown, DropdownButton, InputGroup  } from 'react-bootstrap';


const AddInfluencer = props => {
  // event.preventDefault();
  let initialInfluencerState = {
    
    influencer: "",
    platform: ""

  }
    // keep track of whether new influencer or editing influencer -> defaulting to adding influencer
  let editing = false;
    // see if current influencer was passed into the component (to see if editing -> state is passed in from rest.js)
  // if (props.location.state && props.location.state.currentInfluencer) {
  //   editing = true;
  //   initialInfluencerState = props.location.state.currentInfluencer.text
  // }
  const [validated, setValidated] = useState(false);
  const [influencer, setInfluencer] = useState(initialInfluencerState.influencer);
  const [platform, setPlatform] = useState(initialInfluencerState.platform);
//   keeping track of whether submitted or not
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [finishedGrab, setFinishedGrab] = useState(false);
  const isFirstRun = useRef(true);


  //NOTE SET USERNAME AND AVATAR AND THEN PASS INTO THE USE EFFECT AND THEN INPUT ALL OF IT INTO DATABASE
  async function saveInfluencer(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  

    var data = {
      influencer: influencer,
      platform: platform,
      // name: props.user.name,
      // user_id: props.user.id,
    //   getting right from url
      campaign_id: props.match.params.id
    };
  
      
      CampaignDataService.addLinkArray(data)
      .then(response => {
        console.log(response.data);
        // setSubmitted(true);
        setFinishedGrab(true)
        console.log(finishedGrab)
        
      })
      .catch(e => {
        console.log(e);
      });
        

        // CampaignDataService.saveUsername(data)
        // .then(response => {

        //   setUsername(response.data);
        //   // console.log(response.data);
        //     CampaignDataService.saveAvatar(data)
        //   .then(response => {
        //     setAvatar(response.data);
        //     // console.log(response.data);
            
        //   })
        //   .catch(e => {
        //     console.log(e);
        //   });
        // })
        // .catch(e => {
        //   console.log(e);
        // });

        
    }
  

    useEffect(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      var data = {
        influencer: influencer,
        platform: platform,
        // name: props.user.name,
        // user_id: props.user.id,
      //   getting right from url
        campaign_id: props.match.params.id
      };
      // console.log(data)
      CampaignDataService.createInfluencer(data)
      
        .then(response => {
          console.log(data)
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
  const handlePlatformChange = event => {
    // event.preventDefault();
    setPlatform(event.target.value);
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
                  <h4><Form.Label htmlFor="description">{ editing ? "Edit" : "Upload" } Influencer Video</Form.Label></h4>
              <Row>
                {/* <Col> */}
                {/* <div> */}
                {/* <InputGroup className="mb-3">
    <DropdownButton
      variant="outline-secondary"
      title="Dropdown"
      id="input-group-dropdown-1"
    >
      <Dropdown.Item href="#">Action</Dropdown.Item>
      <Dropdown.Item href="#">Another action</Dropdown.Item>
      <Dropdown.Item href="#">Something else here</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#">Separated link</Dropdown.Item>
    </DropdownButton>
    <FormControl aria-label="Text input with dropdown button" />
  </InputGroup> */}
                <Form.Group 
                  controlId="validationInfluencerType"
                  className="mb-3" 
                  as={Col}
                  md="1"
                 
                  >
                <Form.Control as="select" variant="outline-light" controlId="floatingSelect" value={platform} onChange={handlePlatformChange}>
                  
                  
                  <option>
                    Select Platform
                    
                  </option>
                  <option value="Tik-Tok">Tik-Tok</option>
                  <option value="Instagram">Instagram</option>
                  </Form.Control>
                  <Form.Control.Feedback>Great!</Form.Control.Feedback>
                </Form.Group>
                {/* </Col>
                <Col> */}
                <Form.Group className="mb-3" controlId="validationInfluencer" as={Col} md="10">
                  <FormControl
                      // className="form-control"
                      type="text"
                      required
                      influencer="text"
                      value={influencer}
                      placeholder="Https://www.tiktok.com/@USERNAME/video/..."
                      // onChange={(event) => setUsername(event.target.value)}
                      onChange={handleInfluencerChange}
                  />
                  {/* </div> */}
                  
            {/* <Form.Label>User Role</Form.Label> */}
            
                {/* </Col> */}
                  <Form.Control.Feedback type="invalid">Cannot Submit Blank Influencer</Form.Control.Feedback>
              </Form.Group>
              </Row>
              <Button class="btn" variant="danger" type="submit">Save Influencer</Button>
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
            {/* <Button onClick={saveInfluencer} variant="outline-light">
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
<style type="text/css">
  {`
   *{
     color: black;
     variant: dark;
   }
  .btn{
    background-color: purple;
    variant="danger"
  }
    body > #root > div {
      height: 100vh;
    }
    `}
</style>
  </div>
  );
};

export default AddInfluencer;