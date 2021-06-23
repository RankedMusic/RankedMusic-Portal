import React, { useState } from "react";
import { Form, Row, Col, FormControl, Button, Select } from 'react-bootstrap';
// import FloatingLabel from "react-bootstrap-floating-label";

import { Link } from "react-router-dom";
import CampaignDataService from "../services/campaign";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const NewCampaign = props => {

    // Campaign ID, Platform, Account Executive, Campaign Manager, Client Contact, Artist, Song, Audio Link
    let initialCampaignState = {
        name: "",
        genre: "",
        id:"",
        platform:"",
        accountExec:"",
        campManager:"",
        clientContact:"",
        artist:"",
        song:"",
        songLink:""
    };

    // let editCamp = false;
    // if (props.location.state && props.location.state.currentCamp) {
    //     editCamp = true;
    //     initialCampaignState = props.location.state.currentCamp.text
    // }


    const [name, setCampaign] = useState(initialCampaignState.name);
    const [genre, setGenre] = useState(initialCampaignState.genre);
    const [id, setCampaignID] = useState(initialCampaignState.id);
    const [platform, setCampaignPlat] = useState(initialCampaignState.platform);
    const [accountExec, setCampaignAE] = useState(initialCampaignState.accountExec);
    const [campManager, setCampaignManager] = useState(initialCampaignState.campManager);
    const [clientContact, setCampaignCC] = useState(initialCampaignState.clientContact);
    const [artist, setCampaignArtist] = useState(initialCampaignState.artist);
    const [song, setCampaignSong] = useState(initialCampaignState.song);
    const [songLink, setCampaignLink] = useState(initialCampaignState.songLink);

    const [submitted, setSubmitted] = useState(false);

    async function addCampaign(event) {  
        event.preventDefault();
        var data = {
            name:name,
            genre:genre,
            id:id,
            platform:platform,
            accountExec:accountExec,
            campManager:campManager,
            clientContact:clientContact,
            artist:artist,
            song:song,
            songLink:songLink
        };
        
        // props.add(campaign)
        // props.history.push('/');

        // if (editCamp){
        //     data.camp_id = props.location.state.currentCamp.user_id
        //     // **ADD CAMPAIGN DS**
        //     CampaignDataService.updateCampaign(data)
        //         .then(response => {
        //             setSubmitted(true);
        //             console.log(response.data);
        //         })
        //         .catch(e => {
        //             console.log(e)
        //         });
        // } else{
        CampaignDataService.createCampaign(data)
            .then(response => {
                setSubmitted(true)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            });
        // }
    }

    // Create new handle input change for each var
    const handleNameChange = event => {
        setCampaign(event.target.value);
    }
    const handleGenreChange = event => {
        setGenre(event.target.value);
    }
    const handleIDChange = event => {
        setCampaignID(event.target.value);
    }
    const handlePlatChange = event => {
        setCampaignPlat(event.target.value);
    }
    const handleAEChange = event => {
        setCampaignAE(event.target.value);
    }
    const handleManagerChange = event => {
        setCampaignManager(event.target.value);
    }
    const handleCCChange = event => {
        setCampaignCC(event.target.value);
    }
    const handleArtistChange = event => {
        setCampaignArtist(event.target.value);
    }
    const handleSongChange = event => {
        setCampaignSong(event.target.value);
    }
    const handleLinkChange = event => {
        setCampaignLink(event.target.value);
    };
    // Campaign ID, Platform, Account Executive, Campaign Manager, Client Contact, Artist, Song, Audio Link

    ;
  
    return (
        <div>
            
            {/* {props.user ? (
            <div className="submit-form">
              {submitted ? (
                <div>
                  <h4>New Campaign Successfully Added!</h4>
                  <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
                    Back to Campaigns
                  </Link>
            </div>
              ) : ( */}
    {/* // Campaign ID, Platform, Account Executive, Campaign Manager, Client Contact, Artist, Song, Audio Link */}
                {/* <div  style={{fontSize:'large'},{fontWeight: '900'}}>
                    <p>Add Campaign</p>
                </div>
                <div
                    style={{paddingBottom: '5%'}}
                ></div> */}
                <Form onSubmit={addCampaign}>
                    {/* <Row className="mb-3"> */}
                        <Form.Label size='100' style={{fontWeight: '900'}}>Add Campaign</Form.Label>
                        <Form.Group className="mb-3" controlId="validationName">
                            {/* <FloatingLabel controlId="floatingSelect" label="Campaign Title"> */}
                            <FormControl
                                type="text"
                                className="form-control"
                                name="text"
                                required
                                value={name}
                                onChange={handleNameChange}
                                placeholder="Campaign Title"
                            />
                             {/* </FloatingLabel> */}
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationGenre">
                                <Form.Control as="select" variant="outline-dark" controlId="floatingSelect" value={genre} onChange={handleGenreChange}>
                                    <option>Select Genre</option>
                                    <option value="Latin">Latin</option>
                                    <option value="Pop">Pop</option>
                                    <option value="Hip-Hop">Hip-Hop</option>
                                </Form.Control>
                            <Form.Text className="text-muted" style={{marginLeft:"2%"}}>
                                Optional
                            </Form.Text>
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationID">
                            <Form.Label>Campaign ID</Form.Label>
                            <FormControl
                                type="text"
                                className="form-control"
                                id="text"
                                required
                                value={id}
                                onChange={handleIDChange}
                                placeholder="Campaign ID"
                            />
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationPlatform">
                            <Form.Label>Platform</Form.Label>
                            <FormControl
                                type="text"
                                className="form-control"
                                platform="text"
                                required
                                value={platform}
                                onChange={handlePlatChange}
                                placeholder="Platform"
                            />
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationAE">
                            <Form.Label>Account Executive</Form.Label>
                            <FormControl
                                type="text"
                                className="form-control"
                                platform="text"
                                required
                                value={accountExec}
                                onChange={handleAEChange}
                                placeholder="Account Executive"
                            />
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationManager">
                            <Form.Label>Manager</Form.Label>
                            <FormControl
                                type="text"
                                className="form-control"
                                platform="text"
                                required
                                value={campManager}
                                onChange={handleManagerChange}
                                placeholder="Campaign Manager"
                            />
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCC">
                            <Form.Label>Client Contact</Form.Label>
                            <FormControl
                                type="text"
                                className="form-control"
                                platform="text"
                                required
                                value={clientContact}
                                onChange={handleCCChange}
                                placeholder="Client Contact"
                            />
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationArtist">
                            <Form.Label>Artist</Form.Label>
                            <FormControl
                                type="text"
                                className="form-control"
                                platform="text"
                                required
                                value={artist}
                                onChange={handleArtistChange}
                                placeholder="Artist Name"
                            />
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationSong">
                            <Form.Label>Song</Form.Label>
                            <FormControl
                                type="text"
                                className="form-control"
                                platform="text"
                                required
                                value={song}
                                onChange={handleSongChange}
                                placeholder="Song Name"
                            />
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationLink">
                            <Form.Label>Link</Form.Label>
                            <FormControl
                                type="text"
                                className="form-control"
                                platform="text"
                                required
                                value={songLink}
                                onChange={handleLinkChange}
                                placeholder="Audio Link"
                            />
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>
                    {/* </Row> */}
                    <Button variant="outline-dark" type="submit">Upload New Campaign</Button>
                </Form>


<div
    style={{paddingBottom: '10%'}}
></div>


{/* 

                <div>
                  
                  <div className="form-group"> */}
                      {/* if edit true or false */}
                    {/* <label htmlFor="description">{ editCamp ? "Edit" : "Create" } Campaign</label>
                    <input
                      type="text"
                      className="form-control"
                      id="text"
                      required
                      value={campID}
                      onChange={handleIDChange}
                    
                      type="text"
                      className="form-control"
                      platform="text"
                      required
                      value={campPlat}
                      onChange={handlePlatChange}

                      type="text"
                      className="form-control"
                      accountExec="text"
                      required
                      value={campAE}
                      onChange={handleAEChange}

                      type="text"
                      className="form-control"
                      campManager="text"
                      required
                      value={campManager}
                      onChange={handleManagerChange}

                      type="text"
                      className="form-control"
                      clientContact="text"
                      required
                      value={campCC}
                      onChange={handleCCChange}

                      type="text"
                      className="form-control"
                      artist="text"
                      required
                      value={campArtist}
                      onChange={handleArtistChange}

                      type="text"
                      className="form-control"
                      song="text"
                      required
                      value={campSong}
                      onChange={handleSongChange}

                      type="text"
                      className="form-control"
                      songLink="text"
                      required
                      value={campLink}
                      onChange={handleLinkChange}
                    />
                  </div>
                  <button onClick={add} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
      
        ) : (
            <div>
              Please log in.
            </div>
            )}
       */}
        </div>
    );
};


export default NewCampaign;