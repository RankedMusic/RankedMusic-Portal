import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";


const ViewsChart = props => {
    const [historical_views, setHistoricalViews] = useState(null)

    const data = [{name: 'Jun 30 2021', uv: 400, pv: 2400, amt: 2400}, {name: 'July 01 2021', uv: 600, pv: 2400, amt: 2400}, {name: 'July 02 2021', uv: 760, pv: 2400, amt: 2400}];
    
    
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
    

    useEffect(() => {
        //   console.log(props.match.params.id)
          gather_historical_views();
        //   only will get called if id is updated
      }, [props.campaign_id]);

    const renderLineChart = (
        <LineChart width={1000} height={500} data={historical_views} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
          <Line type="monotone" dataKey="views" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      );

    return(
        <div>
            {'Total Views'}
            {renderLineChart}
        </div>
    )
}

export default ViewsChart