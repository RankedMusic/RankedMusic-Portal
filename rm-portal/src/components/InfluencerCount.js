import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
// import {Link} from "react-router-dom";
// import loading from "./loading"
import ReactLoading from 'react-loading';



const InfluencerCount = props => {

  const [amount, setAmount] = useState(null)
  let campaign_id = props.campaign_id

  const getAmount = (campaign_id) => {
    CampaignDataService.getInfluencerCount({campaign_id : campaign_id})
        .then(response => {
          let amount = response.data
          let amount_commas = (amount).toLocaleString('en')
          setAmount(amount_commas);
            // console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  };

  useEffect(() => {
    getAmount(campaign_id);
    // getAmount();
}, []);
  
    return (
        <div>
            {amount ? ( 
              <div>
              <strong id='tot_likes'>Total Influencers:  </strong>{amount}
              </div>
              ):(
                <div className="d-flex" >
                <strong id='tot_likes'>Total Influencers:</strong>
                <ReactLoading type={"bars"} color={"#f40060"} height={0} width={25}/>
                </div>
              )
            }
        </div>
    );
};

export default InfluencerCount;