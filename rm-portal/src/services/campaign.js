import http from "../http-common";

// where going ot make all f(n) that are going ot make api calls and return the info from the api calls
class CampaignDataService {
    // request that defaults page to 0 and do http get request of url (`` added to base)
    getAll(page=0) {
        return http.get(`?page=${page}`);
    }
    // get campaign w specific id
    get(id){
        return http.get(`/id/${id}`);
    }
    // going to take query (actually searchterm/#, what searching by, what pg number want)
    find(query, by = "name", page=0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }
    // post request of influencer w data
    createInfluencer(data){
        return http.post("/influencer", data);
    }
    // 
    updateInfluencer(data){
    return http.put("/influencer", data);
    }
    deleteInfluencer(id, user_Id){
        return http.delete(`/influencer?id=${id}`, {data:{user_id: user_Id}});
    }

    saveUsername(data){
        return http.post('/save-username', data);
    }
    saveAvatar(data){
        return http.post('/save-avatar', data);
    }
    getVideoLikes(data){
        // console.log(data)
        return http.post('/video_likes', data)
    }
    getVideoComments(data){
        // console.log(data)
        return http.post('/video_comments', data)
    }



    loginUser(data){
        return http.post("/thisUser", data);
    }
    // saveUser(data){
    //     return http.get("/savedUser", data);
    // }
    createUser(data){
        return http.post("/add-user", data);
    }
    // 
    updateUser(data){
    return http.put("/add-user", data);
    }
    deleteUser(id, user_Id){
        return http.delete(`/add-user?id=${id}`, {data:{user_id: user_Id}});
    }
    createCampaign(data){
        return http.post("/addCampaign", data);
    }
    // 
    updateCampaign(data){
    return http.put("/addCampaign", data);
    }
    deleteCampaign(id, user_Id){
        return http.delete(`/addCampaign?id=${id}`, {data:{user_id: user_Id}});
    }
    getGenre(id){
        return http.get(`/genre`);
    }
}

export default new CampaignDataService();