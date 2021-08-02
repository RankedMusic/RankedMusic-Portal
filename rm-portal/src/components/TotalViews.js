import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Table} from 'react-bootstrap';
import VideoBox from './VideoBox'
// import TotalLikes from './TotalLikes'
import ReactLoading from 'react-loading';


const TotalViews = props => {

    const [tot_views, setTotViews] = useState(null)
    let campaign_id = props.campaign_id

    const getTotalLikes = (campaign_id) => {
        // console.log('The campaign id is ' + campaign_id)
        
        CampaignDataService.getTotViews({campaign_id : campaign_id})
            .then(response => {
                let views = response.data
                let views_commas = (views).toLocaleString('en')  
                console.log('We have a total of ' + views_commas + ' views');
                setTotViews(views_commas)
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
            <strong className="d-flex" id = 'tot_views'>Total Views: </strong>
            {tot_views ?(
                <div>
                {tot_views}</div>
            ):(
                <ReactLoading type={"bars"} color={"#f40060"} height={0} width={25}/>
            )}
            

        </div>
    )
};


export default TotalViews;
