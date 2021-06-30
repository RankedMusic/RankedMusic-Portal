import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Table} from 'react-bootstrap';
import VideoBox from './VideoBox'
// import TotalLikes from './TotalLikes'



const TotalComments = props => {

    const [tot_comments, setTotComments] = useState(null)
    let campaign_id = props.campaign_id

    const getTotalComments = (campaign_id) => {
        console.log('The campaign id is ' + campaign_id)
        
        CampaignDataService.getTotComments({campaign_id : campaign_id})
            .then(response => {
                
                // console.log('We have a total of ' + response.data + ' likes');
                setTotComments(response.data)
            })
            .catch(e => {
                console.log(e);
            });

    }

    useEffect(() => {
    
        getTotalComments(campaign_id);
      //   only will get called if id is updated
    },[]);

    return(
        <div>
            <strong id = 'tot_comments'>
            {'Total Comments: ' + tot_comments}
            </strong>
            

        </div>
    )
};


export default TotalComments;
