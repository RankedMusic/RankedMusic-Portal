import React, { useState } from "react";
import { Form, Row, Col, FormControl, Button, Select } from 'react-bootstrap';
// import FloatingLabel from "react-bootstrap-floating-label";
import Modal from 'react-bootstrap/Modal'
import { Link } from "react-router-dom";
import CampaignDataService from "../services/campaign";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const NewCampaign = props => {

    // Campaign ID, Platform, Account Executive, Campaign Manager, Client Contact, Artist, Song, Audio Link
    let initialCampaignState = {
        name: "",
        start: "",
        end: "",
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

    let editCamp = false;
    if (props.location.state && props.location.state.currentCamp) {
        editCamp = true;
        initialCampaignState = props.location.state.currentCamp.text
    }


    const [name, setCampaign] = useState(initialCampaignState.name);
    const [start, setStart] = useState(initialCampaignState.start);
    const [end, setEnd] = useState(initialCampaignState.end);
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
            start:start,
            end:end,
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

        if (editCamp){
            data.camp_id = props.location.state.currentCamp._id
            // **ADD CAMPAIGN DS**
            CampaignDataService.updateCampaign(data, props.match.params._id)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e)
                });
        } else{
            CampaignDataService.createCampaign(data)
                // console.log(props.)
                .then(response => {
                    setSubmitted(true)
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e)
                });
            }
    }

    // Create new handle input change for each var
    const handleNameChange = event => {
        setCampaign(event.target.value);
    }
    const handleStartChange = event => {
        setStart(event.target.value);
    }
    const handleEndChange = event => {
        setEnd(event.target.value);
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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const cList = () =>{ 
        props.history.push('/campaigns');
        setShow(false);
    }
    const newC = () =>{ 
        props.history.push('/addCampaign');
        setShow(false);
    }
    return (
        <div>
         <div className="formCamp">   
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
                <h2 htmlFor="description" variant='dark' className="uploadCampTitle">{ editCamp ? "Edit" : "Upload" }  Campaign</h2>
                <Form onSubmit={addCampaign}>
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
                        <Row className="mb-3" style={{paddingTop:"1%"}}>
                            <Form.Group 
                                className="mb-3" 
                                as={Col} 
                                md="2"
                                controlId="validationStart"
                            >
                                {/* <FloatingLabel controlId="floatingSelect" label="Campaign Title"> */}
                                    <Form.Label>Start Date</Form.Label>
                                    <FormControl
                                        type="date"
                                        className="form-control"
                                        start="date"
                                        required
                                        value={start}
                                        onChange={handleStartChange}
                                        // placeholder="Campaign Title"
                                    />
                                    {/* </FloatingLabel> */}
                                    <Form.Control.Feedback>Great!</Form.Control.Feedback>
                                </Form.Group>
                            <Form.Group 
                                className="mb-3" 
                                as={Col}
                                md="2"
                                controlId="validationEnd"
                            >
                                {/* <FloatingLabel controlId="floatingSelect" label="Campaign Title"> */}
                                    <Form.Label>End Date</Form.Label>
                                    <FormControl
                                        type="date"
                                        className="form-control"
                                        end="date"
                                        required
                                        value={end}
                                        onChange={handleEndChange}
                                        // placeholder="Campaign Title"
                                    />
                                    {/* </FloatingLabel> */}
                                <Form.Control.Feedback>Great!</Form.Control.Feedback>
                            </Form.Group>
                        <Form.Group 
                            controlId="validationGenre"
                            className="mb-3" 
                            as={Col}
                            md="2"
                        >
                        <Form.Label>Genre</Form.Label>
                                <Form.Control as="select" variant="outline-light" controlId="floatingSelect" value={genre} onChange={handleGenreChange}>
                                    <option>Select Genre</option>
                                    <option value="Latin">Latin</option>
                                    <option value="Pop">Pop</option>
                                    <option value="Hip-Hop">Hip-Hop</option>
                                </Form.Control>
                            <Form.Text className="optionalText" style={{marginLeft:"2%"}}>
                                Optional
                            </Form.Text>
                            <Form.Control.Feedback>Great!</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group 
                            className="mb-3" 
                            controlId="validationID"
                            className="mb-3" 
                            as={Col}
                            md=""
                        >
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
                        <Form.Group 
                            className="mb-3" 
                            controlId="validationPlatform"
                            className="mb-3" 
                            as={Col}
                            md="4"
                            >
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
                        </Row>
                        <Row className="mb-3" style={{marginTop:"-1%"}}>
                        <Form.Group 
                            className="mb-3" 
                            controlId="validationAE"
                            as={Col}
                            md="4"
                            >
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

                        <Form.Group 
                            className="mb-3" 
                            controlId="validationManager"
                            as={Col}
                            md="4"
                            >
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

                        <Form.Group 
                            className="mb-3" 
                            controlId="validationCC"
                            as={Col}
                            md="4"
                            >
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
                        </Row>
                        <Row className="mb-3">
                        <Form.Group 
                            className="mb-3" 
                            controlId="validationArtist"
                            as={Col}
                            >
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

                        <Form.Group 
                            className="mb-3" 
                            controlId="validationSong"
                            as={Col}
                            >
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
                        </Row>
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
                    <Button variant="danger" type="submit" className="subForm" onClick={handleShow}>Upload New Campaign</Button>
                </Form>
            </div>
            <div className="modalPop">
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Campaign Successfully Added!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign:"center"}}>
                        Would you like to add another campaign?
                    </Modal.Body>
                    <Modal.Footer style={{margin:"auto"}}>
                        <Button variant="danger" className="btns" onClick={newC}>
                            Add Another Campaign
                        </Button>
                        <Button variant="danger" className="btns" onClick={cList}>Go to Campaign List</Button>
                    </Modal.Footer>
                </Modal>
<style type="text/css">
    {`
     .formCamp{
    //   color: white;
    }
    .optionalText{
        color:lightgrey;
    }
    .uploadCampTitle{
        padding-top:4%;
        padding-bottom:4%;
        text-align:center;
    }
    .modalPop{
        color: black;
        text-align:center;
    }
    .btns{
        background-color: purple;
        variant="danger"
        }
    `}
</style>
            </div>

<div
    style={{paddingBottom: '10%'}}
></div>
        </div>
    );
};


export default NewCampaign;