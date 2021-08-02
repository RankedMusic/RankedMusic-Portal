import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
// import {Link} from "react-router-dom";
import ReactLoading from 'react-loading';


const VideoLikes = props => {
//   const initialRestaurantState = {
//       id: null,
//       name: "",
//       address:"",
//       cuisine:"",
//       reviews:[],
//   };

//   use init rest. state to create a restautant
  const [likes, setLikes] = useState(null)

  const getLikes = () => {
    CampaignDataService.getVideoLikes({video_url : props.video_link})
        .then(response => {
          let likes = response.data
          let likes_commas =(likes).toLocaleString('en')
            setLikes(likes_commas);
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
    
    getLikes();
  //   only will get called if id is updated
}, []);
  
  
    
    return (
        <div>
            {likes ? ( 
              
              <div>
              
              {likes}
              </div>
              ):(
                <div>
                <ReactLoading type={"bars"} color={"#f40060"} height={0} width={25}/>
                </div>
              )
            }
            
        </div>
    );
};

export default VideoLikes;