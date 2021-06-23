import React, { useState, useEffect } from "react";
// import RestaurantDataService from "../services/restaurant";
// import {Link} from "react-router-dom";
import VideoLikes from './VideoLikes'
import VideoComments from './VideoComments'
import InfluencerUsername from './InfluencerUsername'
import Avatar from './Avatar'
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";



const VideoBox = props => {


const deleteInfluencer = (influencerId, index) => {
    CampaignDataService.deleteInfluencer(influencerId, props.user.id)
        .then(response => {
            // set campaign array to be the same array without deleted campaign
            props.setCampaign((prevState) => {
                prevState.influencers.splice(index, 1)
                return({
                    ...prevState
                })
            })
        })
        .catch(e => {
            console.log(e);
        });
};
  
  
    
    return (
            <div className = 'card'>
            <div className="col-lg-4 pb-1" key={props.index}>
                
                    <div className="card-body">
                        <p className="video-content">
                            {props.influencer.text}<br/>
                            <strong>Video URL: </strong>{props.influencer.influencer}<br/>
                            <strong>Date: </strong>{props.influencer.date}

                        </p>
                        {/* NOTE: Kyle made influencer the video url in our influencer object. So influencer.influencer is the video url */}
                        <InfluencerUsername influencer_username = {props.influencer.influencer_username}></InfluencerUsername>
                        <Avatar avatar = {props.influencer.avatar_src}></Avatar>
                        <VideoLikes video_link = {props.influencer.influencer}></VideoLikes>
                        <VideoComments video_link = {props.influencer.influencer}></VideoComments>
                        
                        {/* show buttons depending which user is logged in */}
                        {/* if there is a user is logged in + is logged in as the creator of the influencer -> && if true = does it*/}
                        {/* going to give a delete and edit button */}
                        {props.user && props.user.id === props.influencer.user_id &&
                            <div className="row">
                                <a onClick={() => deleteInfluencer(props.influencer._id, props.index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                                <Link to={{
                                pathname: "/campaigns/" + props.match.params.id + "/influencer",
                                state: {
                                    currentInfluencer: props.influencer
                                }
                                }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                            </div>                   
                        }
                    </div>
                
            </div>
            
            {/* <VideoLikes video_link = {props.influencer.influencer}></VideoLikes> */}
            {/* <VideoComments video_link = {props.influencer.influencer}></VideoComments> */}


            {/* <VideoShares video_link = {props.video.video_url}></VideoShares> */}
            {/* <InfluencerUsername video_link = {props.video.video_url}></InfluencerUsername> */}
            {/* <InfluencerAvatar video_link = {props.video.video_url}></InfluencerAvatar> */}

            {/* <VideoLink></VideoLink> */}
        </div>
    );
};

export default VideoBox;






