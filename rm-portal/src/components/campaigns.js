import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import { Form, Row, Col, FormControl, Button, Table, Tab, Tabs, FormCheck, OverlayTrigger, Popover} from 'react-bootstrap';
import VideoBox from './VideoBox'
import TotalLikes from './TotalLikes'
import TotalComments from './TotalComments'
import TotalFollowers from './TotalFollowers'
import InfluencerCount from './InfluencerCount'
import TotalViews from './TotalViews'
import ViewsChart from './ViewsChart'
import LikesChart from './LikesChart'
import FollowersChart from './FollowersChart'
import CommentsChart from './CommentsChart'
import Card from 'react-bootstrap/Card'
import Overlay from 'react-bootstrap/Overlay'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css'
// import { MDBIcon } from 'mdb-react-ui-kit'
// import 'font-awesome/css/font-awesome.min.css';

const Campaign = props => {
  const initialCampaignState = {
    name: "",
    start: "",
    end: "",
    genre:"",
    id:"",
    platform:"",
    accountExec:"",
    campManager:"",
    clientContact:"",
    artist:"",
    song:"",
    songLink:"",
    influencers:[]
  };
//   use init rest. state to create a campaign
  const [campaign, setCampaign] = useState(initialCampaignState)
  const [influencers_map, setInfluencersMap] = useState(null)
  const [updatedDate, setUpdatedDate] = useState(null)
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [dataView, setDataView] = useState(true);
  // let [editBtn,setEditBtn] = useState(null)

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
    // console.log(isSwitchOn);
    
  };
  const changeViewAction = () => {
    setDataView(!dataView);
  };
  const getCampaign = id => {
    // console.log('The id is ' + id)
    // console.log(props.user);
    CampaignDataService.get(id)
        .then(response => {
          setCampaign(response.data);
          const string = response.data.influencers[0].date_views_updated.substring(14)
          const string_array = string.split(" ")
          const month = string_array[0]
          const day = string_array[1]
          const year = string_array[2]
          const date = month + " " + day + ", " + year
          setUpdatedDate(date)
        })
        .catch(e => {
            console.log(e);
        });
  };
  const campPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Campaign Overview</Popover.Title>
      <Popover.Content>
        General campaign information summary
      </Popover.Content>
    </Popover>
  );
  const influencerPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Influencers</Popover.Title>
      <Popover.Content>
        Campaing influencers tracked <em>(updated daily)</em> <br></br>
        <strong>Views:</strong> Current number of post views.
        <br></br><strong>Likes:</strong> Current number of post likes.
        <br></br><strong>Comments:</strong> Current number of post comments.
        <br></br><strong>Video Link:</strong> Link to post.
        <br></br><strong>Date:</strong> Date influencer post added to campaign.
        <br></br><strong>Followers:</strong> Current number of influencer followers.
      </Popover.Content>
    </Popover>
  );
//   called when component first renders
  useEffect(() => {
    //   console.log(props.match.params.id)
      getCampaign(props.match.params.id);
    //   only will get called if id is updated
  }, [props.match.params.id]);

  useEffect(() => {
    // console.log(campaign)
    // console.log(campaign.influencers)
     {/* NOTE retaurant.review sshould be campaign.videos or something like that */}
        // let videos_array = []
        // console.log(restaurant.reviews)
        let influencer_map =  campaign.influencers.map((influencer, index) => {
          // return <VideoBox></VideoBox>
          // console.log(video, index)
        //   console.log(influencer)
          return <VideoBox influencer = {influencer} index = {index} setCampaign = {setCampaign} isSwitchOn={isSwitchOn} dataView={dataView} setDataView={setDataView}></VideoBox>
          // console.log(videos)
          
        }
        );
        setInfluencersMap(influencer_map)
        
        // console.log(Object.values(influencer_map))
    
  },[campaign, isSwitchOn, dataView]);
  useEffect(() => {
    if (isSwitchOn === null){
      setIsSwitchOn("false")
    }
    
  }, [isSwitchOn]);

  useEffect(() => {
    if (dataView === null){
      setDataView("false")
    }
  }, [dataView]);

    
    return (
        <div>
            {/* if there is a campaign (otherwise return non selected - at bottom) */}
            {campaign ? (
                <div>
                  <div className="campTitle"  style={{textAlign: "center"}}>
                    <h1 className="cT">{campaign.name}</h1>
                  </div>
                  <br></br>
                    <Card>
                    <Card.Header style={{fontWeight:"bold", color:"#f40060" }}>
                      
                      Campaign Overview 
                      <OverlayTrigger trigger="hover" placement="top" overlay={campPopover}>
                        {/* <Button variant="success">Click me to see</Button> */}
                        <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"1%", float:"right"}} width="18" height="18" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                      </OverlayTrigger>
                    </Card.Header>
                    <Card.Body>
                    <Row className="cInfo">
                        <Col>
                        <strong>Start Date: {campaign.start}</strong>
                        </Col>
                        <Col>
                        <strong>End Date: {campaign.end}</strong>
                        </Col>
                        <Col>
                        <strong>Genre: </strong>{campaign.genre}
                        </Col>
                        <Col>
                        {/* <br/> */}
                        <InfluencerCount campaign_id = {props.match.params.id} ></InfluencerCount>
                        </Col>
                        {/* {campaign.address.building} {campaign.address.street}, {campaign.address.zipcode} */}
                        <style type="text/css">{`
                          .cInfo{
                            padding-top: 3%;
                            padding-bottom: 3%;
                          }
                          `}</style>
                      </Row>
                    <Table style={{ borderColor: ""}} bordered hover >
                      <tbody>
                        <tr>
                          <td><em>Campaign ID: </em>{campaign.id}</td> 
                          <td><em>Client Contact: </em>{campaign.clientContact}</td>
                        </tr>
                        <tr>
                          <td><em>Platform: </em>{campaign.platform}</td>
                          <td><em>Artist: </em>{campaign.artist}</td>
                          
                        </tr>
                        <tr>
                        <td><em>Account Executive: </em>{campaign.accountExec}</td>
                        <td><em>Song: </em>{campaign.song}</td>
                          
                        </tr>
                        <tr>
                        <td><em>Campaign Manager: </em>{campaign.campManager}</td>
                        <td> <em>AudioLink: </em>{campaign.songLink}</td>
                          
                          
                        </tr>
                      </tbody>
                    </Table>
                  <Row>
                    <Col>
                      <TotalViews campaign_id = {props.match.params.id} ></TotalViews>
                    </Col>
                    <Col>
                      <TotalLikes campaign_id = {props.match.params.id} ></TotalLikes>
                    </Col>
                    <Col>
                      <TotalComments campaign_id = {props.match.params.id} ></TotalComments>
                    </Col>
                    <Col>
                      <TotalFollowers campaign_id = {props.match.params.id}> </TotalFollowers>
                    </Col>


                  </Row>
                    </Card.Body>
                  </Card>
                  <br></br>
                    {props.user ?(
                    <Link to={"/campaigns/" + props.match.params.id + "/influencer"} className="btn btn-outline-dark">
                        Add Influencer
                    </Link>
                    ) : (
                      ''
                    )}
                  <Card>
                   <Card.Header style={{fontWeight:"bold", color:"#f40060" }}> 
                   <Row>
                      <Col>
                          <a > Influencers </a>
                      </Col>
                      <Col  md={{ span: 1, offset: 9 }}>
                      <a style={{paddingLeft:"75%"}}>{props.user ?(
                            <BootstrapSwitchButton
                              checked={isSwitchOn}
                              onlabel={
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                </svg>
                              }
                              offlabel={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                              }
                              onstyle="outline-success" 
                              offstyle="outline-danger"
                              // width= {80}
                              // height={40}
                              size="sm"
                              data-size="sm"
                              placement="right"
                              // disabled
                              onChange={onSwitchAction}

                            />
                          ) : (
                            ''
                          )} </a>
                      </Col>
                      <Col>
                      <a><OverlayTrigger trigger="hover" placement="left" overlay={influencerPopover}>            
                        <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"1%", float:"right"}} width="18" height="18" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 18 18">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                      </OverlayTrigger>  </a>
                      </Col>


                      {/* <Col md={{ span: 2, offset: 4 }}>
                        </Col> */}
                    </Row>
                     
                          
                               
                    </Card.Header>
                    
                    <Card.Body>
                    <div className="tab-wrapper">
                      <div className='container-fluid' >
                        <div className="row">
                          <div className="col-sm-12">
                            
                            <Tabs variant="pills" defaultActiveKey="cards" className="flex-row" onSelect={changeViewAction} style={{float:"right", marginTop:"-.5%", paddingBottom:"1%", marginRight:"3%"}}>
                              
                              <Tab 
                                eventKey="cards" 
                                title={
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-view-list" viewBox="0 0 16 16">
                                   <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z"/>
                                 </svg>
                                }
                              >
                                <br></br>
                                <div className="tab-item-wrapper">
                                  {/* <Card.Body> */}
                                  <br></br>
                                    <div className="row" id="infl">
                                        {influencers_map}
                                    </div>
                                  {/* </Card.Body> */}
                                  <p>Last Update: {updatedDate}</p>
                                </div>
                              </Tab>

                              <Tab 
                                eventKey="contact" 
                                title={
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                                  </svg>
                                }
                              >
                                <div className="tab-item-wrapper">
                                  {/* <div className="row" id="infl"> */}
                                    <Table borderless style={{marginBottom: "-.1%", marginLeft:"1%",  width:"98%"}}>
                                      <thead>
                                          <tr >
                                            <th width="10.3%">Platform</th>
                                            <th width="15%">Username</th>
                                            <th width="13%">Views</th>
                                            <th width="12%">Likes</th>
                                            <th width="16%">Comments</th>
                                            <th width="10%">Date</th>
                                            <th width="1%">Link</th>
                                          </tr>
                                      </thead>
                                    </Table>
                                      {/* <tbody> */}
                                        {/* <tr> */}
                                          {influencers_map}
                                        {/* </tr> */}
                                      {/* </tbody> */}
                                    {/* </Table> */}
                                    </div>
                                  <p>Last Update: {updatedDate}</p>
                                {/* </div> */}
                              </Tab>
                            </Tabs>

                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                  </Card>
                    <div>
                    <br></br>
                    <br></br><br></br>
                    <div className="tab-wrapper">
                      <div className='container-fluid'>
                        <div className="row">
                          <div className="col-sm-12">
                          
                            <Tabs justify variant="tabs" defaultActiveKey="views" style={{background: '#FAFAFA'}} className="tabss">
                              {/* <Tab eventKey="overall" title="Comprehensive">
                                <div className="tab-item-wrapper">
                                  <br></br><br></br>
                                  <h5 className="text-center" style={{fontWeight:"bold", color:"#f40060" }}>Comprehensive Campaign Analytics</h5>
                                  <br></br><br></br>
                                  <br></br><br></br><br></br><br></br>
                                </div>
                              </Tab> */}

                              <Tab eventKey="views" title="Views">
                                <div className="tab-item-wrapper">
                                  <br></br><br></br>
                                  <h5 className="text-center" style={{fontWeight:"bold", color:"#f40060" }}>Campaign Views Analytics</h5>
                                  <br></br><br></br>
                                  <ViewsChart campaign_id = {props.match.params.id}></ViewsChart>

                                </div>
                              </Tab>

                              <Tab eventKey="likes" title="Likes">
                                <div className="tab-item-wrapper">
                                <br></br><br></br>
                                  <h5 className="text-center" style={{fontWeight:"bold", color:"#f40060" }}>Campaign Likes Analytics</h5>
                                  <br></br><br></br>
                                  <LikesChart campaign_id = {props.match.params.id}></LikesChart>
                                  <br></br><br></br><br></br><br></br>
                                </div>
                              </Tab>

                              <Tab eventKey="comments" title="Comments">
                                <div className="tab-item-wrapper">
                                <br></br><br></br>
                                  <h5 className="text-center" style={{fontWeight:"bold", color:"#f40060" }}>Campaign Comments Analytics</h5>
                                  <br></br><br></br>
                                  <CommentsChart campaign_id = {props.match.params.id}></CommentsChart>
                                  {/* <br></br><br></br><br></br><br></br> */}
                                </div>
                              </Tab>
                              <Tab eventKey="followers" title="Followers">
                                <div className="tab-item-wrapper">
                                <br></br><br></br>
                                  <h5 className="text-center" style={{fontWeight:"bold", color:"#f40060" }}>Campaign Followers Analytics</h5>
                                  <br></br><br></br>
                                  <FollowersChart campaign_id = {props.match.params.id}></FollowersChart>
                                  {/* <br></br><br></br><br></br><br></br> */}
                                </div>
                              </Tab>
                            </Tabs>

                          
                      </div>
                    </div>


                </div>
              </div>
                    
                      
                  </div>

                    <style type="text/css">
                        {`
                        body > #root > div {
                          height: 100vh;
                        }
                        h4{
                          color:black;
                        }
                        #infl{
                          color: black;
                          margin:auto;
                        }
                        .campTitle{
                          color: black;
                        }
                        `}
                    </style>
                </div>
            ) : (
            <div>
                <br />
                <p>No campaign selected.</p>
            </div>
            )}
                </div>
    
    );
    
};

export default Campaign;
