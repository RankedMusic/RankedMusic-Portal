import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
// import {Link} from "react-router-dom";



const PostDate = props => {
    const [postdate, setPostDate] = useState(null)
  useEffect(() => {
    
    let props_post = props.postdate
    if(props_post != null){
        let postdate_split = props_post.split(' ')
        let month = postdate_split[0] 
        let day = postdate_split[1] 
        let year = postdate_split[2] 

        let postdate_comma = month + ' ' + day + ', ' + year
    setPostDate(postdate_comma)
    }

    // console.log(props.avatar)
  //   only will get called if id is updated
}, [props.postdate]);
  
  
    
    return (
        <div>
            {postdate}
            
        </div>
    );
};

export default PostDate;