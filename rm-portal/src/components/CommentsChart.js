import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, Pie, PieChart, Cell, BarChart, Label, Bar, LabelList } from 'recharts';
import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import Card from 'react-bootstrap/Card'
import { Form, Row, Col, Tab, Tabs, Nav, FormControl, Button, Table, FormCheck, OverlayTrigger, Popover} from 'react-bootstrap';

const CommentsChart = props => {
    const [historical_comments, setHistoricalComments] = useState(null)
    const [influencer_comments, setInfluencerComments] = useState(null)
    const data = [{name: 'Jun 30 2021', uv: 400, pv: 2400, amt: 2400}, {name: 'July 01 2021', uv: 600, pv: 2400, amt: 2400}, {name: 'July 02 2021', uv: 760, pv: 2400, amt: 2400}];
    
    const gather_historical_comments = () => {        
        CampaignDataService.getHistoricalCommentsArray({campaign_id: props.campaign_id})
        .then(response => {
            // console.log(response.data)
            setHistoricalComments(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    };
    const gather_influencer_comments = () => {
      // [{name: 'Jun 30 2021', uv: 400, pv: 2400, amt: 2400}, {name: 'July 01 2021', uv: 600, pv: 2400, amt: 2400}, {name: 'July 02 2021', uv: 760, pv: 2400, amt: 2400}]
      
      CampaignDataService.get(props.campaign_id)
      .then(response => {
          let influencers_array = response.data.influencers
          // console.log(influencers_array)
          let influencer_comments_array = []
          for(let i = 0; i < influencers_array.length; i = i + 1){
            let username_string = influencers_array[i].username_string
            
            
            let comments = influencers_array[i].num_comments
            // console.log('Username for pie chart is ' + only_username + ' and has ' + comments + ' comments')
            influencer_comments_array.push({name: username_string, comments: comments})
          }
          // NOTE: influencer_views_array is an array of objects of the form [{username: 'name', comments: 324}, ...]
          // console.log(influencer_comments_array)
          setInfluencerComments(influencer_comments_array)
      })
      .catch(e => {
          console.log(e)
      })
  };
    const colors = ["#f40060","#830056","#3f0350","#26004f","#7cbf3e","#d6de35", "blue", "green", "yellow"]
    const totHistCommentsPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Total Historical Comments</Popover.Title>
        <Popover.Content>
          Number of post comments on a specific date <em>following</em> the date influencer was added to the campaign.
        </Popover.Content>
      </Popover>
    );
    const commentsPerPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Comments per Influencer</Popover.Title>
        <Popover.Content>
          Proportional representation of the total sum of comments contributed by <em>each influencer</em>.
        </Popover.Content>
      </Popover>
    );
    useEffect(() => {
        //   console.log(props.match.params.id)
          gather_historical_comments();
          gather_influencer_comments();
        //   only will get called if id is updated
      }, [props.campaign_id]);
  
    const renderLineChart = (
      // <div>
        <LineChart width={1000} height={500} data={historical_comments} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
          <Legend verticalAlign="top" height={36} layout="vertical" />
          <Line type="monotone" dataKey="comments" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      // </div> 
      );

      const RADIAN = Math.PI / 180;
      const render_pie_labels = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

    const renderPieChart = (
        <PieChart width={1000} height={500} label = {render_pie_labels}>
              <Legend align="right" verticalAlign="middle" height={36} layout="vertical" />

            <Pie data={influencer_comments} dataKey='comments' legendType='square' outerRadius={200} label = {render_pie_labels}>
              {data.map((entry, index) => (
                
                <Cell key={`cell-${entry}`} fill={colors[index % colors.length]} label = {render_pie_labels}/>
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
    );

    return(
      <div>
        <div className="lineComments">
          <Card>
            <Card.Header style={{fontWeight:"bold", color:"#f40060" }}>
              Historical Total Comments
              <OverlayTrigger trigger="hover" placement="bottom" overlay={totHistCommentsPopover}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"1%", float:"right"}} width="18" height="18" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
              </OverlayTrigger>
            </Card.Header>
            <Card.Body>
            {renderLineChart}
            </Card.Body>
          </Card>
        </div>
                          
        <br></br><br></br>
        <div className="pieComments">
          <Card>
            <Card.Header style={{fontWeight:"bold", color:"#f40060" }}>
                Comments per Influencer
              <OverlayTrigger trigger="hover" placement="bottom" overlay={commentsPerPopover}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:"1%", float:"right"}} width="18" height="18" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
              </OverlayTrigger>
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

export default CommentsChart