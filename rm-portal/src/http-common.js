import axios from "axios";

export default axios.create({
    // First for localhost, second for Nash ec2, third for Thiago ec2
    // baseURL: "http://localhost:5000/api/v1/campaigns",
    
    // baseURL: "http://ec2-3-15-26-27.us-east-2.compute.amazonaws.com:5000/api/v1/campaigns",
    
    baseURL: "http://ec2-18-118-20-171.us-east-2.compute.amazonaws.com:5000/api/v1/campaigns",


    headers: {
        "Content-type": "application/json"
    }
});