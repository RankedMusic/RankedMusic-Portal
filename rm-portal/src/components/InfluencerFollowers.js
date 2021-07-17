import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
// import {Link} from "react-router-dom";



const InfluencerFollowers = props => {
//   const initialRestaurantState = {
//       id: null,
//       name: "",
//       address:"",
//       cuisine:"",
//       reviews:[],
//   };

//   use init rest. state to create a restautant
  const [followers, setFollowers] = useState(null)

  const getFollowers = () => {
    CampaignDataService.getInfluencerFollowers({video_url : props.video_link})
        .then(response => {
            setFollowers(response.data);
            // console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  };

// //   called when component first renders
//   useEffect(() => {
//     //   getRestaurant(props.match.params.id);
//     //   only will get called if id is updated
//     let likes = RestaurantDataService.getVideoLikes({video_url : props.video_link})
//     // console.log(RestaurantDataService.getVideoLikes({video_url : props.video_link}))
//     setLikes(likes)
//     console.log(likes)
//     // fetch("http://localhost:5000/api/v1/webscrape_tester")
//     //     .then((response) => response.json())
//     //    .then(data => {
//     //        console.log(data)
//     //       setLikes(data.like_string)
//     //    })
//     },[props.video_link]);

  useEffect(() => {
    
    getFollowers();
  //   only will get called if id is updated
}, []);
  
  
    
    return (
        <div>
            {followers ? ( 
              
              <div>
              <strong>Followers: </strong>
              {followers}
              </div>
              ):(
                <div>
                <p>Loading Data</p>
                </div>
              )
            }
            
        </div>
    );
};

export default InfluencerFollowers;