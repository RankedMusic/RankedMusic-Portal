import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Table} from 'react-bootstrap';
import VideoBox from './VideoBox'
// import TotalLikes from './TotalLikes'



const TotalViews = props => {

    const [tot_views, setTotViews] = useState(null)
    let campaign_id = props.campaign_id

    const getTotalLikes = (campaign_id) => {
        console.log('The campaign id is ' + campaign_id)
        
        CampaignDataService.getTotViews({campaign_id : campaign_id})
            .then(response => {
                
                console.log('We have a total of ' + response.data + ' views');
                setTotViews(response.data)
            })
            .catch(e => {
                console.log(e);
            });
          


    }

    useEffect(() => {
    
        getTotalLikes(campaign_id);
      //   only will get called if id is updated
    },[]);

    return(
        <div>
            <strong id = 'tot_views'>Total Views: </strong>{tot_views}
            

        </div>
    )
};


export default TotalViews;
