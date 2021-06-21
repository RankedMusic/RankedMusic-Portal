import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button } from 'react-bootstrap';



const Campaign = props => {
  const initialCampaignState = {
    name: "",
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

  const getCampaign = id => {
    CampaignDataService.get(id)
        .then(response => {
            setCampaign(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  };

//   called when component first renders
  useEffect(() => {
      getCampaign(props.match.params.id);
    //   only will get called if id is updated
  }, [props.match.params.id]);
  
//   only can delete if logged in as creator user
  const deleteInfluencer = (influencerId, index) => {
      CampaignDataService.deleteInfluencer(influencerId, props.user.id)
        .then(response => {
            // set campaign array to be the same array without deleted campaign
            setCampaign((prevState) => {
                prevState.influencers.splice(index, 1)
                return({
                    ...prevState
                })
            })
        })
        .catch(e => {
            console.log(e);
        });
  };
  
  
    
    return (
        <div>
            {/* if there is a campaign (otherwise return non selected - at bottom) */}
            {campaign ? (
                <div>
                    <h5>{campaign.name}</h5>
                    <p>
                        <strong>Influencer Count?: </strong>
                        {/* {campaign.cuisine}<br/> */}
                        <strong>Content?: </strong>
                        {/* {campaign.address.building} {campaign.address.street}, {campaign.address.zipcode} */}
                    </p>
                    <Link to={"/campaigns/" + props.match.params.id + "/influencer"} className="btn btn-primary variant-outline-dark">
                        Add Influencer
                    </Link>
                    {/* <Button variant="outline-dark" to={"/campaigns/" + props.match.params.id + "/influencer"}>Add Influencer</Button> */}
                    <h4> Influencers </h4>
                    <div className="row">
                        {/* if there are influencers (>0) -> otherwise returns no influencers */}
                        {campaign.influencers.length > 0 ? (
                            // for each influencer -> going to be cards w text, user, date
                        campaign.influencers.map((influencer, index) => {
                            return (
                                <div className="col-lg-4 pb-1" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">
                                                {influencer.text}<br/>
                                                <strong>Influencer Link </strong>{influencer.influencer}<br/>
                                                <strong>Date: </strong>
                                                {/* {influencer.date} */}
                                            </p>
                                            {/* show buttons depending which user is logged in */}
                                            {/* if there is a user is logged in + is logged in as the creator of the influencer -> && if true = does it*/}
                                            {/* going to give a delete and edit button */}
                                            {props.user && props.user.id === influencer.user_id &&
                                                <div className="row">
                                                    <a onClick={() => deleteInfluencer(influencer._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                                                    <Link to={{
                                                    pathname: "/campaigns/" + props.match.params.id + "/influencer",
                                                    state: {
                                                        currentInfluencer: influencer
                                                    }
                                                    }} classname="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                                                </div>                   
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        ) : (
                        <div className="col-sm-4">
                            <p>No influencers yet.</p>
                        </div>
                        )}
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
