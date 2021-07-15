import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav'
// import RestaurantDataService from "../services/restaurant";
// import {Link} from "react-router-dom";
import VideoLikes from './VideoLikes'
import VideoComments from './VideoComments'
import VideoViews from './VideoViews'
import InfluencerUsername from './InfluencerUsername'
import Avatar from './Avatar'
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Select } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'


const VideoBox = props => {
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState(null);
    let [editBtn,setEditBtn] = useState(props.isSwitchOn)
    let video_link = props.influencer.influencer
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

            
            // console.log(video_link)
            CampaignDataService.removeFromLinksArray({video_link: video_link})

        })
        .catch(e => {
            console.log(e);
        });
};
const getUsername = () => {
CampaignDataService.saveUsername({video_link: video_link})
        .then(response => {
            console.log('Our username is ' + response.data)
          setUsername(response.data);
          // console.log(response.data);
        //     CampaignDataService.saveAvatar(props.influencer.influencer)
        //   .then(response => {
        //     setAvatar(response.data);
        //     // console.log(response.data);
            
        //   })
        //   .catch(e => {
        //     console.log(e);
        //   });
        })
        .catch(e => {
          console.log(e);
        });
    }


useEffect(() => {
    //   console.log(props.match.params.id)
        getUsername(video_link);
    //   only will get called if id is updated
}, [video_link]);

useEffect(() => {
    if (editBtn === false){
        setEditBtn(null);
      }
    // if (props.isSwitchOn === true){
    //     setEditBtn("true");
    // }
    console.log(editBtn);
}, [props.isSwitchOn]);
  
    
    return (
            <div className = 'card'>
            <div className="" key={props.index}>
                
                    <div className="card-body">
                        {editBtn ?(
                        <div className="delButton" style={{float:"right"}}>
                            <a onClick={() => deleteInfluencer(props.influencer._id)} className="btn btn-outline-danger col-lg-5 mx-1 mb-1" style={{height:"auto"},{width:"auto"}}>x</a>
                        </div>
                        ) : (
                            ''
                        )}
                        <Row>
                        <Col md="auto"><Avatar avatar = {props.influencer.avatar_src}></Avatar></Col>
                        <Col md="auto">{username}</Col>
                        <Col md="auto"><VideoViews video_link = {props.influencer.influencer}></VideoViews></Col>
                        <Col md="auto"><VideoLikes video_link = {props.influencer.influencer}></VideoLikes></Col>
                        <Col md="auto"><VideoComments video_link = {props.influencer.influencer}></VideoComments></Col>

                        {/* <Col md="auto" style={{marginLeft:"11%"}}> */}
                            {/* <p className="video-content"> */}
                                {/* {props.influencer.text}<br/> */}
                                <Col md="auto">
                                <strong><Nav.Link href={props.influencer.influencer} style={{marginTop:"-7%"}}>Video Link</Nav.Link></strong>
                                </Col>
                                <Col md="auto">
                                    <strong>Date: </strong>{props.influencer.date}
                                </Col>
                            {/* </p> */}
                            {/* // </Col> */}
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






