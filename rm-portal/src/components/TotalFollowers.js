import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Table} from 'react-bootstrap';
import VideoBox from './VideoBox'
// import TotalLikes from './TotalLikes'
import ReactLoading from 'react-loading';


const TotalFollowers = props => {

    const [tot_followers, setTotFollowers] = useState(null)
    let campaign_id = props.campaign_id

    const getTotalFollowers = (campaign_id) => {
        console.log('The campaign id is ' + campaign_id)
        
        CampaignDataService.getTotFollowers({campaign_id : campaign_id})
            .then(response => {
                let followers = response.data
                let followers_commas = (followers).toLocaleString('en')
                // console.log('We have a total of ' + response.data + ' likes');
                setTotFollowers(followers_commas)
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
        <div className="d-flex">
            <strong className="d-flex" id='tot_likes'>Total Followers:  </strong>
            
            {tot_followers ?(
                <div>{tot_followers}</div>
            ):(
                <ReactLoading type={"bars"} color={"#f40060"} height={0} width={25}/>
            )}
            

        </div>
    )
};


export default TotalFollowers;
