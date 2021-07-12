import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Table} from 'react-bootstrap';
import VideoBox from './VideoBox'
import TotalLikes from './TotalLikes'
import TotalComments from './TotalComments'
import TotalViews from './TotalViews'
import ViewsChart from './ViewsChart'
import Card from 'react-bootstrap/Card'
import Overlay from 'react-bootstrap/Overlay'


const Campaign = props => {
  const initialCampaignState = {
    name: "",
    start: "",
    end: "",
    genre:"",
    id:"",
    platform:"",
    accountExec:"",
    campManager:"",
    clientContact:"",
    artist:"",
    song:"",
    songLink:"",
    influencers:[]
  };
//   use init rest. state to create a campaign
  const [campaign, setCampaign] = useState(initialCampaignState)
  const [influencers_map, setInfluencersMap] = useState(null)

  const getCampaign = id => {
    // console.log('The id is ' + id)
    // console.log(props.user);
    CampaignDataService.get(id)
        .then(response => {
          setCampaign(response.data);
            
        })
        .catch(e => {
            console.log(e);
        });
  };


//   called when component first renders
  useEffect(() => {
    //   console.log(props.match.params.id)
      getCampaign(props.match.params.id);
    //   only will get called if id is updated
  }, [props.match.params.id]);

  useEffect(() => {
    // console.log(campaign)
    // console.log(campaign.influencers)
     {/* NOTE retaurant.review sshould be campaign.videos or something like that */}
        // let videos_array = []
        // console.log(restaurant.reviews)
        let influencer_map =  campaign.influencers.map((influencer, index) => {
          // return <VideoBox></VideoBox>
          // console.log(video, index)
        //   console.log(influencer)
          return <VideoBox influencer = {influencer} index = {index} setCampaign = {setCampaign} ></VideoBox>
          // console.log(videos)
          
        }
        );
        setInfluencersMap(influencer_map)
        
        // console.log(Object.values(influencer_map))
    
  },[campaign]);
    
    return (
        <div>
            {/* if there is a campaign (otherwise return non selected - at bottom) */}
            {campaign ? (
                <div>
                  <div className="campTitle"  style={{textAlign: "center"}}>
                    <h1 className="cT">{campaign.name}</h1>
                  </div>
                  <br></br>
                    <Card>
                    <Card.Header style={{fontWeight:"bold", color:"#f40060" }}>
                      
                      Campaign Overview 
                      <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"1%", float:"right"}} width="18" height="18" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                      </svg>
                    </Card.Header>
                    <Card.Body>
                    <Row className="cInfo">
                        <Col>
                        <strong>Start Date: {campaign.start}</strong>
                        </Col>
                        <Col>
                        <strong>End Date: {campaign.end}</strong>
                        </Col>
                        <Col>
                        <strong>Genre: </strong>{campaign.genre}
                        </Col>
                        <Col>
                        {/* <br/> */}
                        <strong>Influencer Count: </strong>
                        </Col>
                        {/* {campaign.address.building} {campaign.address.street}, {campaign.address.zipcode} */}
                        <style type="text/css">{`
                          .cInfo{
                            padding-top: 3%;
                            padding-bottom: 3%;
                          }
                          `}</style>
                      </Row>
                    <Table variant='dark' style={{borderRight: "0"}} bordered hover >
                      <tbody>
                        <tr>
                          <td>Campaign ID: {campaign.id}</td>
                          <td>Client Contact: {campaign.clientContact}</td>
                        </tr>
                        <tr>
                          <td>Platform: {campaign.platform}</td>
                          <td>Artist: {campaign.artist}</td>
                          
                        </tr>
                        <tr>
                        <td>Account Executive: {campaign.accountExec}</td>
                        <td>Song: {campaign.song}</td>
                          
                        </tr>
                        <tr>
                        <td>Campaign Manager: {campaign.campManager}</td>
                        <td> AudioLink: {campaign.songLink}</td>
                          
                          
                        </tr>
                      </tbody>
                    </Table>
                  <Row>
                    <Col>
                      <TotalViews campaign_id = {props.match.params.id} ></TotalViews>
                    </Col>
                    <Col>
                      <TotalLikes campaign_id = {props.match.params.id} ></TotalLikes>
                    </Col>
                    <Col>
                      <TotalComments campaign_id = {props.match.params.id} ></TotalComments>
                    </Col>

                  </Row>
                    </Card.Body>
                  </Card>
                  <br></br>
                    {props.user ?(
                    <Link to={"/campaigns/" + props.match.params.id + "/influencer"} className="btn btn-outline-dark">
                        Add Influencer
                    </Link>
                    ) : (
                      ''
                    )}
                    <Card>
                    {/* <Button variant="outline-light" to={"/campaigns/" + props.match.params.id + "/influencer"}>Add Influencer</Button> */}
                   <Card.Header style={{fontWeight:"bold", color:"#f40060" }}> 
                      Influencers 
                      <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"1%", float:"right"}} width="18" height="18" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 18 18">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                      </svg>
                    </Card.Header>
                   <Card.Title >Total Followers: </Card.Title>
                      <Card.Body>
                    <div className="row" id="infl">
                        {/* if there are influencers (>0) -> otherwise returns no influencers */}
                        {/* {campaign.influencers.length > 0 ? ({influencers_map}) : (
                                <div className="col-sm-4">
                                    <p>No influencers yet.</p>
                                </div>
                        )} */}
                        {influencers_map}
                    </div>
                    </Card.Body>
                    </Card>
                    <ViewsChart campaign_id = {props.match.params.id}></ViewsChart>

                    <style type="text/css">
                        {`
                        body > #root > div {
                          height: 100vh;
                        }
                        h4{
                          color:black;
                        }
                        #infl{
                          color: black;
                          margin:auto;
                        }
                        .campTitle{
                          color: black;
                        }
                        `}
                    </style>
                </div>
            ) : (
            <div>
                <br />
                <p>No campaign selected.</p>
            </div>
            )}
                </div>
    
    );
    
};

export default Campaign;
