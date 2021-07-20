import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
// import {Link} from "react-router-dom";



const InfluencerPlatform = props => {

  useEffect(() => {
    
    // console.log(props.avatar)
  //   only will get called if id is updated
}, []);
  
  
    
    return (
        <div>
            {props.platform}
            
        </div>
    );
};

export default InfluencerPlatform;