import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
// import {Link} from "react-router-dom";



const InfluencerUsername = props => {

  useEffect(() => {
    
    // console.log(props.influencer_username)
  //   only will get called if id is updated
}, []);
  
  
    
    return (
        <div>
            {props.influencer_username}
            
        </div>
    );
};

export default InfluencerUsername;