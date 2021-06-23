import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
// import {Link} from "react-router-dom";



const InfluencerUsername = props => {

  useEffect(() => {
    
    console.log(props.username_object)
  //   only will get called if id is updated
}, []);
  
  
    
    return (
        <div>
            {'hello'}
            
        </div>
    );
};

export default InfluencerUsername;