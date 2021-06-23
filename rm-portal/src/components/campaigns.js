import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button } from 'react-bootstrap';
import VideoBox from './VideoBox'



const Campaign = props => {
  const initialCampaignState = {
    name: "",
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
    CampaignDataService.get(id)
        .then(response => {
            // console.log(response.data)
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
    console.log(campaign.influencers)
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
  
//   only can delete if logged in as creator user
  
  
    
    return (
        <div>
            {/* if there is a campaign (otherwise return non selected - at bottom) */}
            {campaign ? (
                <div>
                    <h5>{campaign.name}</h5>
                    
                        <strong>Influencer Count?: </strong>
                        {/* <br/> */}
                        <strong>Genre?: </strong>{campaign.genre}
                        {/* {campaign.address.building} {campaign.address.street}, {campaign.address.zipcode} */}
                    
                    <Link to={"/campaigns/" + props.match.params.id + "/influencer"} className="btn btn-primary variant-outline-dark">
                        Add Influencer
                    </Link>
                    {/* <Button variant="outline-dark" to={"/campaigns/" + props.match.params.id + "/influencer"}>Add Influencer</Button> */}
                    <h4> Influencers </h4>
                    <div className="row">
                        {/* if there are influencers (>0) -> otherwise returns no influencers */}
                        {/* {campaign.influencers.length > 0 ? ({influencers_map}) : (
                                <div className="col-sm-4">
                                    <p>No influencers yet.</p>
                                </div>
                        )} */}
                        {influencers_map}
                    </div>

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
