import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav'
// import RestaurantDataService from "../services/restaurant";
// import {Link} from "react-router-dom";
import VideoLikes from './VideoLikes'
import VideoComments from './VideoComments'
import VideoViews from './VideoViews'
import InfluencerUsername from './InfluencerUsername'
import InfluencerFollowers from './InfluencerFollowers'
import Avatar from './Avatar'
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Select } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'


const VideoBox = props => {
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState(null);
    let [editBtn,setEditBtn] = useState(null)
    let [changeView,setChangeView] = useState(null)
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
    if (props.isSwitchOn === false){
        setEditBtn(null);
      }
    if (props.isSwitchOn === true){
        setEditBtn("true");
    }
    console.log(editBtn);
    console.log(props.isSwitchOn)
}, [props.isSwitchOn]);
useEffect(() => {
    if (props.dataView === false){
        setChangeView(null);
      }
    if (props.dataView === true){
        setChangeView("true");
    }
}, [props.dataView]);
  
    
    return (
        <div>
        {changeView ?(
        <div className = 'card'style={{marginBottom: ".8%"}}>
            <div className="" key={props.index}>
                
                    <div className="card-body">
                        {editBtn ?(
                        <div className="delButton" style={{float:"right"}}>
                            <a onClick={() => deleteInfluencer(props.influencer._id)} className="btn btn-outline-danger col-lg-5 mx-1 mb-1" style={{height:"auto"},{width:"auto"}}>x</a>
                        </div>
                        ) : (
                            ''
                        )}
                        <Row >
                        <Col md="auto"><Avatar avatar = {props.influencer.avatar_src}></Avatar></Col>
                        <Col md="auto">{username}</Col>
                        <Col md="auto"><VideoViews video_link = {props.influencer.influencer}></VideoViews></Col>
                        <Col md="auto"><VideoLikes video_link = {props.influencer.influencer}></VideoLikes></Col>
                        <Col md="auto"><VideoComments video_link = {props.influencer.influencer}></VideoComments></Col>
                        <Col md="auto"><InfluencerFollowers video_link = {props.influencer.influencer}></InfluencerFollowers></Col>

                        {/* <Col md="auto" style={{marginLeft:"11%"}}> */}
                            {/* <p className="video-content"> */}
                                {/* {props.influencer.text}<br/> */}
                                <Col md="auto">
                                <strong><Nav.Link href={props.influencer.influencer} style={{marginTop:"-7%"}}>Video Link</Nav.Link></strong>
                                </Col>
                                <Col md="auto">
                                    {/* <strong>Date: </strong>{props.influencer.date} */}
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
        </div>
                ) : (

                    
                    <div key={props.index} style={{marginBottom: "-1.3%"}}>
                                    
                    <Table bordered hover>
                    {/* <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        <tr>
                            <td width="7%"><Avatar avatar = {props.influencer.avatar_src}></Avatar></td>
                            <td width="19%">{username}</td>
                            <td width="13%"><VideoViews video_link = {props.influencer.influencer}></VideoViews></td>
                            <td width="13%"><VideoLikes video_link = {props.influencer.influencer}></VideoLikes></td>
                            <td width="13%"><VideoComments video_link = {props.influencer.influencer}></VideoComments></td>
                            <td width="15%">{props.influencer.date}</td>
                            <td width="1%"><Nav.Link href={props.influencer.influencer} style={{marginTop:"-7%"}}>Link</Nav.Link></td>
                            {editBtn ?(
                                <td><a onClick={() => deleteInfluencer(props.influencer._id)} className="btn btn-outline-danger col-lg-5 mx-1 mb-1" style={{height:"auto"},{width:"auto"}}>x</a></td>
                            ) : (
                                ''
                            )}
                        </tr>
                        </tbody>
                        </Table>
                    </div>


                    )}
        </div>
    );
};

export default VideoBox;






