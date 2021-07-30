import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Table} from 'react-bootstrap';
import VideoBox from './VideoBox'
// import TotalLikes from './TotalLikes'
import ReactLoading from 'react-loading';


const TotalLikes = props => {

    const [tot_likes, setTotLikes] = useState(null)
    let campaign_id = props.campaign_id

    const getTotalLikes = (campaign_id) => {
        // console.log('The campaign id is ' + campaign_id)
        
        CampaignDataService.getTotLikes({campaign_id : campaign_id})
            .then(response => {
                let likes = response.data
                let likes_commas = (likes).toLocaleString('en')
                // console.log('We have a total of ' + response.data + ' likes');
                setTotLikes(likes_commas)
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
        <div className="d-flex">
            <strong className="d-flex" id='tot_likes'>Total Likes:  </strong>
            
            {tot_likes ?(
                <div>{tot_likes}</div>
            ):(
                <ReactLoading type={"bars"} color={"#f40060"} height={0} width={25}/>
            )}
            

        </div>
    )
};


export default TotalLikes;
