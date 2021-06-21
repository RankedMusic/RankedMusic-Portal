import http from "../http-common";

// where going ot make all f(n) that are going ot make api calls and return the info from the api calls
class RestaurantDataService {
    // request that defaults page to 0 and do http get request of url (`` added to base)
    getAll(page=0) {
        return http.get(`?page=${page}`);
    }
    // get restaurant w specific id
    get(id){
        return http.get(`/id/${id}`);
    }
    // going to take query (actually searchterm/#, what searching by, what pg number want)
    find(query, by = "name", page=0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }
    // post request of review w data
    createReview(data){
        return http.post("/review", data);
    }
    // 
    updateReview(data){
    return http.put("/review", data);
    }
    deleteReview(id, user_Id){
        return http.delete(`/review?id=${id}`, {data:{user_id: user_Id}});
    }
    getCuisines(id){
        return http.get(`/cuisines`);
    }
}

export default new RestaurantDataService();