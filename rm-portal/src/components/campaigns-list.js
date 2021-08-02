import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Switch, Route } from "react-router-dom";
import NewCampaign from "./addCampaign";
import '../App.css';

// take and use props as part of this function
// create react hooks to make a bunch of state vars
const CampaignsList = props => {
  // what can search for on page
  const [campaigns, setCampaigns] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [genre, setGenre] = useState(["All Genres"]);
  

  // Retrieve campaign and cuisine after render
  useEffect(() => {
    retrieveCampaigns();
    retrieveGenre();
  }, []);
 

  // when someone types in search + set below to whatever typed in
  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };
  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };
  const onChangeSearchGenre = e => {
    const searchGenre = e.target.value;
    setSearchGenre(searchGenre);
  };
    
  const retrieveCampaigns = () => {
    CampaignDataService.getAll()
      .then(response => {
        console.log(response.data);
        setCampaigns(response.data.campaigns);
      })
      .catch(e => {
        console.log(e);
      });
    } 


  const getDate = date => {

      let months_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 
      'Nov', 'Dec']
      const startString = date
      const startString_array = startString.split("-")
      const startMonthNum = parseInt(startString_array[1])
      const startMonth = months_array[startMonthNum-1]
      const startDay = startString_array[2]
      const startYear = startString_array[0]
      console.log("start month: ", startMonth)
      const sDate = startMonth + " " + startDay + ", " + startYear
      return(sDate);

  };


  

  const retrieveGenre = () => {
    CampaignDataService.getGenre()
      .then(response => {
        console.log(response.data);
        // drop down menu -> going to start w all cuisines if dont want specific cuisine
        setGenre(["All Genres"].concat(response.data));


      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCampaigns();
  }

  // going to be called by functions below
  // going to pass in query + by (name)
  const find = (query, by) => {
    CampaignDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setCampaigns(response.data.campaigns);
      })
      .catch(e => {
        console.log(e);
      });
  };
//   const deleteCampaign = (campaignId, index) => {
//     RestaurantDataService.deleteCampaign(campaignId)
//       .then(response => {
//           // set restaurant array to be the same array without deleted restaurant
//           setRestaurant((prevState) => {
//               prevState.reviews.splice(index, 1)
//               return({
//                   ...prevState
//               })
//           })
//       })
//       .catch(e => {
//           console.log(e);
//       });
// };
// user types + clicks search then run functions below -> go to find function above
  const findByName = () => {
    find(searchName, "name")
  }
  const findByZip = () => {
    find(searchZip, "zipcode")
  };
  const findByGenre = () => {
    if (searchGenre == "All Genres") {
      refreshList();
    } else {
      find(searchGenre, "genre")
    }
  };

  return (
    <div style={{width:"95%"}}>
      <div className="row pb-1">
        {/* input group -> 3 ways ppl can search */}
        <div className="input-group col-lg-4">
          {/* search by name */}
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
            // style={{backgroundColor:"lightgrey"}}
            // style={{color:"#d6de35"}}
            />
            {/* onClick button that finds by name */}
            <div className="input-group-append">
              <Button
                // className="btn btn-outline-secondary"
                variant="outline-danger"
                type="button"
                onClick={findByName}
              >
                Search
              </Button>
            </div>
        </div>
        <div className="input-group col-lg-4" style={{paddingLeft:"1%", paddingTop:"1%", paddingBottom:"1%"}}>

        {/* going to set cusiine var to selected -> going to map each cuisine in array going to add value to search box*/}
          <select className="genreSearch" onChange={onChangeSearchGenre} style={{borderRadius: "3px"}}>
            {genre.map(genre => {
              return(
                <option value={genre}> {genre.substr(0,20)}</option>
              )
            })}
          </select>
          <div className="input-group-append" style={{paddingLeft:"1px"}}>
            <Button
              // className="btn btn-outline-secondary"
              variant="outline-danger"
              type="button"
              onClick={findByGenre}
            >
              Search
            </Button>
          </div>

        </div>
      </div>
      <div className="row" >
        {/* map f(n) to map thru campaigns array */}
        {campaigns.sort(function(a,b){
          return new Date(b.start)- new Date (a.start)
        })
          .map((campaign) => {
          // getting address of each campaign + put 3 components of addy in 1 string
          // const address = `${campaign.address.building} ${campaign.address.street}, ${campaign.address.zipcode}`;
          // for each campaign returning info of each campaign in a card
          return (
            <div className="col-lg-4 pb-1 h-100">
              <Card action border="light" bg="light">
                <Card.Header as="h7" style={{fontSize:"80%", color:"#f40060"}}><em><strong>Account Executive: </strong></em>{campaign.accountExec}</Card.Header>
                <Card.Body>
                  <Card.Title as="h5">{campaign.name}</Card.Title>
                  <Card.Text>
                    <strong>Start Date: </strong>{getDate(campaign.start)}<br/>
                    <strong>End Date: </strong>{getDate(campaign.end)}<br/>
                    <strong>Genre: </strong>{campaign.genre}
                    {/* {address} */}
                  </Card.Text>
                  <div className="row">
                  <Link to={"/campaigns/"+campaign._id} className="btn btn-outline-dark">Campaign Overview</Link>
                  <Link to={{
                    pathname: "/campaigns/addCampaign/"+campaign._id,
                    state: {
                      currentCampaign: campaign
                    }
                    }} className="btn btn-outline-primary col-lg-6 mt-1">Edit</Link>
                    <Switch>
                      <Route
                        path="/campaigns/addCampaign/:id"
                        render={(props) => (
                          <NewCampaign {...props} campaign={props.campaign} />
                        )}
                      />
                    </Switch>
                  <Link to={"/campaigns/"+campaign._id} className="btn btn-outline-danger col-lg-6 mt-1">delete</Link>



                  {/* <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a> */}
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default CampaignsList;