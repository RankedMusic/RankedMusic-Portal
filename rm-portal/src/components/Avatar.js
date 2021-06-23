import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
// import {Link} from "react-router-dom";



const Avatar = props => {

  useEffect(() => {
    
    console.log(props.avatar)
  //   only will get called if id is updated
}, []);
  
  
    
    return (
        <div>
            <img alt src = {props.avatar} ></img>
            
        </div>
    );
};

export default Avatar;