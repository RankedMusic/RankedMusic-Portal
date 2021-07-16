import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Table} from 'react-bootstrap';
import VideoBox from './VideoBox'
// import TotalLikes from './TotalLikes'



const TotalFollowers = props => {

    const [tot_followers, setTotFollowers] = useState(null)
    let campaign_id = props.campaign_id

    const getTotalFollowers = (campaign_id) => {
        console.log('The campaign id is ' + campaign_id)
        
        CampaignDataService.getTotFollowers({campaign_id : campaign_id})
            .then(response => {
                
                console.log('We have a total of ' + response.data + ' likes');
                setTotFollowers(response.data)
            })
            .catch(e => {
                console.log(e);
            });
          


    }

    useEffect(() => {
    
        getTotalFollowers(campaign_id);
      //   only will get called if id is updated
    },[]);

    return(
        <div>
            <strong id='tot_likes'>Total Followers:  </strong>
            
            {tot_followers}
            

        </div>
    )
};


export default TotalFollowers;
