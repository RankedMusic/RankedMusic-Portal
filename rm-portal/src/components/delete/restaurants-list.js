import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


// take and use props as part of this function
// create react hooks to make a bunch of state vars
const RestaurantsList = props => {
  // what can search for on page
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  

  // Retrieve restaurant and cuisine after render
  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
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
  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

    
  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  } 

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        // drop down menu -> going to start w all cuisines if dont want specific cuisine
        setCuisines(["All Cuisines"].concat(response.data));


      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  }

  // going to be called by functions below
  // going to pass in query + by (name)
  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };
// user types + clicks search then run functions below -> go to find function above
  const findByName = () => {
    find(searchName, "name")
  }
  const findByZip = () => {
    find(searchZip, "zipcode")
  };
  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  return (
    <div>
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
            />
            {/* onClick button that finds by name */}
            <div className="input-group-append">
              <Button
                // className="btn btn-outline-secondary"
                variant="outline-dark"
                type="button"
                onClick={findByName}
              >
                Search
              </Button>
              
            </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <Button
              // className="btn btn-outline-secondary"
              variant="outline-dark"
              type="button"
              onClick={findByZip}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="input-group col-lg-4">

        {/* going to set cusiine var to selected -> going to map each cuisine in array going to add value to search box*/}
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map(cuisine => {
              return(
                <option value={cuisine}> {cuisine.substr(0,20)}</option>
              )
            })}
          </select>
          <div className="input-group-append">
            <Button
              // className="btn btn-outline-secondary"
              variant="outline-dark"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </Button>
          </div>

        </div>
      </div>
      <div className="row">
        {/* map f(n) to map thru restaurants array */}
        {restaurants.map((restaurant) => {
          // getting address of each restaurant + put 3 components of addy in 1 string
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          // for each restaurant returning info of each restaurant in a card
          return (
            <div className="col-lg-4 pb-1">
              <Card action border="light" bg="light">
                <Card.Header as="h6">Some Info Here?</Card.Header>
                <Card.Body>
                  <Card.Title as="h5">{restaurant.name}</Card.Title>
                  <Card.Text>
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </Card.Text>
                  <div className="row">
                  <Link to={"/restaurants/"+restaurant._id} className="btn btn-outline-dark">Campaign Overview</Link>
                  {/* <Button to={"/restaurants/"+restaurant._id} variant="outline-dark"></Button>  */}
                  <Button variant="outline-secondary" className="col-lg-5 mt-1" size="sm">Update</Button> 

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

export default RestaurantsList;