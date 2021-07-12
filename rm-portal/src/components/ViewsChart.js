import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, Pie, PieChart, Cell, BarChart, Label, Bar, LabelList } from 'recharts';
import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import Card from 'react-bootstrap/Card'

const ViewsChart = props => {
    const [historical_views, setHistoricalViews] = useState(null)
    const [influencer_views, setInfluencerViews] = useState(null)
    const data = [{name: 'Jun 30 2021', uv: 400, pv: 2400, amt: 2400}, {name: 'July 01 2021', uv: 600, pv: 2400, amt: 2400}, {name: 'July 02 2021', uv: 760, pv: 2400, amt: 2400}];
    const infData = [{username_string:'tuckercomedy', views_string: 100}, {username_string:'oficialdankhumor', views_string: 6824}, {username_string:'tuckercomedy', views_string: 100}];
    
    const gather_historical_views = () => {
        // [{name: 'Jun 30 2021', uv: 400, pv: 2400, amt: 2400}, {name: 'July 01 2021', uv: 600, pv: 2400, amt: 2400}, {name: 'July 02 2021', uv: 760, pv: 2400, amt: 2400}]
        
        CampaignDataService.getHistoricalViewsArray({campaign_id: props.campaign_id})
        .then(response => {
            console.log(response.data)
            setHistoricalViews(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    };
    const gather_influencer_views = () => {
      // [{name: 'Jun 30 2021', uv: 400, pv: 2400, amt: 2400}, {name: 'July 01 2021', uv: 600, pv: 2400, amt: 2400}, {name: 'July 02 2021', uv: 760, pv: 2400, amt: 2400}]
      
      CampaignDataService.get(props.campaign_id)
      .then(response => {
          console.log("XXXXX"+response.influencer)
          CampaignDataService.saveUsername(response.influencer)
          CampaignDataService.getVideoViews(response.influencer)
          setInfluencerViews(response.infData)
      })
      .catch(e => {
          console.log(e)
      })
  };
    const colors = ["#f40060","#830056","#3f0350","#26004f","#7cbf3e","#d6de35", "blue", "green", "yellow"]
    useEffect(() => {
        //   console.log(props.match.params.id)
          gather_historical_views();
          gather_influencer_views();
        //   only will get called if id is updated
      }, [props.campaign_id]);
  
    const renderLineChart = (
      // <div>
        <LineChart width={1000} height={500} data={historical_views} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
          <Legend verticalAlign="top" height={36} layout="vertical" />
          <Line type="monotone" dataKey="views" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      // </div> 
      );
    const renderPieChart = (
        // <ResponsiveContainer width="6250%" height="3125%">
        // historical_views = [{views: 100, user: 'kyle'},{views: 200},{views: 400}]
          <PieChart width={1000} height={500} data={influencer_views} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <Legend align="right" verticalAlign="middle" height={36} layout="vertical" />

            <Pie dataKey="views" data={influencer_views} legendType='square' outerRadius={200} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
            
            <Tooltip />
          </PieChart>

        // </ResponsiveContainer>

    );

    return(
        <div>
          <br></br>
          <br></br>
          <div className="lineViews">
            <Card>
              <Card.Header style={{fontWeight:"bold", color:"#f40060" }}>
                Historical Total Views
                <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"1%", float:"right"}} width="18" height="18" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
              </Card.Header>
              <Card.Body>

              {renderLineChart}

              </Card.Body>

            </Card>
          </div>
            <br></br><br></br>
            <br></br><br></br>
          <div className="pieViews">
            <Card>
              <Card.Header style={{fontWeight:"bold", color:"#f40060" }}>
                Views per Influencer
                <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"1%", float:"right"}} width="18" height="18" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
              </Card.Header>
              <Card.Body>

              {renderPieChart}

              </Card.Body>

            </Card>
            
            <br></br><br></br>
          </div>
        </div>
    )
}
<style type="text/css">
    {`
    body > #root > div {
      height: 100vh;
    }

    `}
</style>

export default ViewsChart