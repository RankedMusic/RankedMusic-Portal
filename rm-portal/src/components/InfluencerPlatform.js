import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import ReactLoading from 'react-loading';
// import {Link} from "react-router-dom";



const InfluencerPlatform = props => {

  useEffect(() => {
    
    // console.log(props.avatar)
  //   only will get called if id is updated
}, []);
  
  
    
    return (
        <div>
            {props.platform ? (
              <div>
                {props.platform}
              </div>
            ):(
              <ReactLoading type={"bars"} color={"#f40060"} height={0} width={25}/>
            )}
            
        </div>
    );
};

export default InfluencerPlatform;