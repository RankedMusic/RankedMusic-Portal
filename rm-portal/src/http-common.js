import axios from "axios";

export default axios.create({
    // TO CONNECT TO THE LOCAL HOST BACKEND, UNCOMMENT THE LINE BELOW AND COMMENT OUT OTHER BASE URL
    baseURL: "http://localhost:5000/api/v1/campaigns",
    // baseURL: "http://ec2-3-15-26-27.us-east-2.compute.amazonaws.com:5000/api/v1/campaigns",
    headers: {
        "Content-type": "application/json"
    }
});