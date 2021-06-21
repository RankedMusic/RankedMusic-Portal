import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

const AddReview = props => {
  let initialReviewState = ""
    // keep track of whether new review or editing review -> defaulting to adding review
  let editing = false;
    // see if current review was passed into the component (to see if editing -> state is passed in from rest.js)
  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState);
//   keeping track of whether submitted or not
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
    //   getting right from url
      restaurant_id: props.match.params.id
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div>
        {/* check to see if user (if no -> wont submit + say pls log in) */}
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
              Back to Campaigns
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
                {/* if edit true or false */}
              <br/>
              <h4><label htmlFor="description">{ editing ? "Edit" : "Upload" } Tik-Tok Influencer Video</label></h4>
              <br/>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
                placeholder="Link to Tik-Tok Video "
              />
              <br/>
            </div>
            <Button onClick={saveReview} variant="outline-dark">
              Submit
            </Button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
};

export default AddReview;