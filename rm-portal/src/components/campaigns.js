import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Table} from 'react-bootstrap';
import VideoBox from './VideoBox'
import TotalLikes from './TotalLikes'
import TotalComments from './TotalComments'
import TotalViews from './TotalViews'



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
                  </div>
                  <TotalViews campaign_id = {props.match.params.id} ></TotalViews>
                  <TotalLikes campaign_id = {props.match.params.id} ></TotalLikes>
                  <TotalComments campaign_id = {props.match.params.id} ></TotalComments>
                  <br></br>
                    <Link to={"/campaigns/" + props.match.params.id + "/influencer"} className="btn btn-outline-dark">
                        Add Influencer
                    </Link>
                    {/* <Button variant="outline-light" to={"/campaigns/" + props.match.params.id + "/influencer"}>Add Influencer</Button> */}
                    <h4> Influencers </h4>
                    <div className="row" id="infl">
                        {/* if there are influencers (>0) -> otherwise returns no influencers */}
                        {/* {campaign.influencers.length > 0 ? ({influencers_map}) : (
                                <div className="col-sm-4">
                                    <p>No influencers yet.</p>
                                </div>
                        )} */}
                        {influencers_map}
                    </div>
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
