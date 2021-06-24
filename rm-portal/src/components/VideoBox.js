import React, { useState, useEffect } from "react";
// import RestaurantDataService from "../services/restaurant";
// import {Link} from "react-router-dom";
import VideoLikes from './VideoLikes'
import VideoComments from './VideoComments'
import InfluencerUsername from './InfluencerUsername'
import Avatar from './Avatar'
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Select } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'


const VideoBox = props => {


const deleteInfluencer = (influencerId) => {
    CampaignDataService.deleteInfluencer(influencerId)
        .then(response => {
            // set campaign array to be the same array without deleted campaign
            props.setCampaign((prevState) => {
                prevState.influencers.splice(influencerId, 1)
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
            <div className="" key={props.index}>
                
                    <div className="card-body">
                        <div className="delButton" style={{float:"right"}}>
                            <a onClick={() => deleteInfluencer(props.influencer._id)} className="btn btn-outline-danger col-lg-5 mx-1 mb-1" style={{height:"auto"},{width:"auto"}}>x</a>
                        </div>
                        <Row>
                        <Col md="auto"><Avatar avatar = {props.influencer.avatar_src}></Avatar></Col>
                        <Col md="auto"><InfluencerUsername influencer_username = {props.influencer.influencer_username}></InfluencerUsername></Col>
                        <Col md="auto"><VideoLikes video_link = {props.influencer.influencer}></VideoLikes></Col>
                        <Col md="auto"><VideoComments video_link = {props.influencer.influencer}></VideoComments></Col>

                        <Col md="auto" style={{marginLeft:"11%"}}>
                            <p className="video-content">
                                {/* {props.influencer.text}<br/> */}
                                <strong>Video URL: </strong>{props.influencer.influencer}<br/>
                                <strong>Date: </strong>{props.influencer.date}
                            </p>
                            </Col>
                        </Row>
                        {/* NOTE: Kyle made influencer the video url in our influencer object. So influencer.influencer is the video url */}
                        {/* show buttons depending which user is logged in */}
                        {/* if there is a user is logged in + is logged in as the creator of the influencer -> && if true = does it*/}
                        {/* going to give a delete and edit button */}
                        {props.user && props.user.id === props.influencer.user_id &&
                            <div className="row">
                                {/* <Link to={{
                                pathname: "/campaigns/" + props.match.params.id + "/influencer",
                                state: {
                                    currentInfluencer: props.influencer
                                }
                                }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link> */}
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






