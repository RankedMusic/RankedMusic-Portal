import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Table} from 'react-bootstrap';
import VideoBox from './VideoBox'
import ReactLoading from 'react-loading';
// import TotalLikes from './TotalLikes'



const TotalComments = props => {

    const [tot_comments, setTotComments] = useState(null)
    let campaign_id = props.campaign_id

    const getTotalComments = (campaign_id) => {
        console.log('The campaign id is ' + campaign_id)
        
        CampaignDataService.getTotComments({campaign_id : campaign_id})
            .then(response => {
                let comments = response.data
                let comments_commas = comments.toLocaleString('en')
                // console.log('We have a total of ' + response.data + ' likes');
                setTotComments(comments_commas)
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
        <div className="d-flex">
            <strong className="d-flex" id = 'tot_comments'>Total Comments: </strong>
            {tot_comments ?(
                <div>{tot_comments}</div>
            ):(
                <ReactLoading type={"bars"} color={"#f40060"} height={0} width={25}/>
            )}
            

        </div>
    )
};


export default TotalComments;
