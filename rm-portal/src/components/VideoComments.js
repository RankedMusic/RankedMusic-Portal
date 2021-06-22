import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
// import {Link} from "react-router-dom";



const VideoComments = props => {
//   const initialRestaurantState = {
//       id: null,
//       name: "",
//       address:"",
//       cuisine:"",
//       reviews:[],
//   };

//   use init rest. state to create a restautant
  const [comments, setComments] = useState(null)

  const getComments = () => {
    CampaignDataService.getVideoComments({video_url : props.video_link})
        .then(response => {
            setComments(response.data);
            console.log(response.data);
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
    
    getComments();
  //   only will get called if id is updated
}, []);
  
  
    
    return (
        <div>
            {comments ? ( 
              <div>
              {comments.comment_string}
              </div>
              ):(
                <div>
                <br />
                <p>Loading Data</p>
                </div>
              )
            }
            
        </div>
    );
};

export default VideoComments;