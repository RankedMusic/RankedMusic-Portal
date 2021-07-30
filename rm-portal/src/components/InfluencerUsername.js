import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
// import {Link} from "react-router-dom";
import ReactLoading from 'react-loading';


const InfluencerUsername = props => {

  useEffect(() => {
    
    // console.log(props.influencer_username)
  //   only will get called if id is updated
}, []);
  
  
    
    return (
        <div>
            {props.influencer_username ?(
              <div>{props.influencer_username}</div>
            ):(
              <ReactLoading type={"bars"} color={"#f40060"} height={0} width={25}/>
            )}
            
        </div>
    );
};

export default InfluencerUsername;