import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav'
// import RestaurantDataService from "../services/restaurant";
// import {Link} from "react-router-dom";
import VideoLikes from './VideoLikes'
import VideoComments from './VideoComments'
import VideoViews from './VideoViews'
import InfluencerUsername from './InfluencerUsername'
import InfluencerFollowers from './InfluencerFollowers'
import InfluencerPlatform from './InfluencerPlatform'
import Avatar from './Avatar'
import PostDate from './PostDate'
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
            // console.log('Our username is ' + response.data)
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
    // console.log(editBtn);
    // console.log(props.isSwitchOn)
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
        // <Col style={{padding:"6%"}}>
        <div>
            
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
                            {/* <Col md="auto"><Avatar avatar = {props.influencer.avatar_src}></Avatar></Col> */}
                            <Row className="d-flex" xs="auto" md="auto" lg="auto"><strong>Username:</strong>{username}</Row>
                            <Row className="d-flex" xs="auto" md="auto" lg="auto"><strong>Platform:</strong><InfluencerPlatform platform = {props.influencer.platform}></InfluencerPlatform></Row>
                            <Row className="d-flex" xs="auto" md="auto" lg="auto"><strong>Post Date:</strong><PostDate postdate = {props.influencer.postdate}></PostDate></Row>
                            <Col className="d-flex" xs="auto" md="auto" lg="auto"><strong>Views:</strong> <VideoViews video_link = {props.influencer.influencer}></VideoViews></Col>
                            <Col className="d-flex" xs="auto" md="auto" lg="auto"><strong>Likes: </strong><VideoLikes video_link = {props.influencer.influencer}></VideoLikes></Col>
                            <Col className="d-flex" xs="auto" md="auto" lg="auto"><strong>Comments: </strong><VideoComments video_link = {props.influencer.influencer}></VideoComments></Col>
                            <Col className="d-flex" xs="auto" md="auto" lg="auto"><strong>Followers: </strong><InfluencerFollowers video_link = {props.influencer.influencer}></InfluencerFollowers></Col>
                            <Col md="auto">
                                <strong><Nav.Link href={props.influencer.influencer} style={{marginTop:"-7%"}}>Video Link</Nav.Link></strong>
                            </Col>
                            </Row>
                    </div>
                {/* </div> */}
            </div>
        </div>
        // </Col>
                ) : (

                    
                    <div key={props.index} style={{margin: "-1%"}}>
                                    
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
                            <td width="7.3%"><InfluencerPlatform platform = {props.influencer.platform}></InfluencerPlatform></td>
                            <td width="15%">{username}</td>
                            <td width="13%"><VideoViews video_link = {props.influencer.influencer}></VideoViews></td>
                            <td width="13%"><VideoLikes video_link = {props.influencer.influencer}></VideoLikes></td>
                            <td width="13%"><VideoComments video_link = {props.influencer.influencer}></VideoComments></td>
                            <td width="15%"><PostDate postdate = {props.influencer.postdate}></PostDate></td>
                            <td width="1%"><Nav.Link href={props.influencer.influencer} style={{marginTop:"-7%"}}>Link</Nav.Link></td>
                            {editBtn ?(
                                <td width="1%"><a onClick={() => deleteInfluencer(props.influencer._id)} className="btn btn-outline-danger col-lg-5 mx-1 mb-1" style={{height:"auto"},{width:"auto"}}>x</a></td>
                            ) : (
                                ""
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






