import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, Pie, PieChart, Cell, BarChart, Label, Bar, LabelList } from 'recharts';
import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import Card from 'react-bootstrap/Card'
import { Form, Row, Col, Tab, Alert, Tabs, Nav, Toast, FormControl, Button, Table, FormCheck, OverlayTrigger, Popover} from 'react-bootstrap';
import { ResponsivePieCanvas } from '@nivo/pie'
import { ResponsivePie } from '@nivo/pie'
import { animated } from '@react-spring/web'
import ContentLoader from 'react-content-loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TotalViews from './TotalViews';
// import TotalViews from './TotalViews';

const ViewsChart = props => {
    const [historical_views, setHistoricalViews] = useState(null)
    const [influencer_views, setInfluencerViews] = useState([])
    const [totalView, setTotalView] = useState(null)
    const [totalComma, setTotalComma] = useState(null)
    // const [sumView, setSumView] = useState(null)
    const [influencer_views_percent, setInfluencerViewsPercent] = useState([])
    const data = [{name: 'Jun 30 2021', uv: 400, pv: 2400, amt: 2400}, {name: 'July 01 2021', uv: 600, pv: 2400, amt: 2400}, {name: 'July 02 2021', uv: 760, pv: 2400, amt: 2400}];
    // const infData = [{username_string:'tuckercomedy', views_string: 100}, {username_string:'oficialdankhumor', views_string: 6824}, {username_string:'tuckercomedy', views_string: 100}];
    
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
    let sumViews = 0
    const gather_influencer_views = () => {
      // [{name: 'Jun 30 2021', uv: 400, pv: 2400, amt: 2400}, {name: 'July 01 2021', uv: 600, pv: 2400, amt: 2400}, {name: 'July 02 2021', uv: 760, pv: 2400, amt: 2400}]
      
      CampaignDataService.get(props.campaign_id)
      .then(response => {
          let influencers_array = response.data.influencers
          // console.log(influencers_array)
          let influencer_views_array = []
          for(let i = 0; i < influencers_array.length; i = i + 1){
            let username_string = influencers_array[i].username_string
            
            
            let views = influencers_array[i].views_num
            sumViews+=views
            // console.log('Username for pie chart is ' + only_username + ' and has ' + views + ' views')
            influencer_views_array.push({id: username_string, value: views})
            // let new_object = {username: username, }
          }
          // NOTE: influencer_views_array is an array of objects of the form [{username: 'name', views: 324}, ...]
          // console.log(influencer_views_array)
          setInfluencerViews(influencer_views_array)

          
          setTotalView(sumViews);
          

          //This code is to add a comma to the total views in the pie chart
          let views_commas = (sumViews).toLocaleString('en')  
          console.log('We have a total of ' + views_commas + ' views');
          setTotalComma(views_commas);
          
          // CampaignDataService.saveUsername(response.influencer)
          // CampaignDataService.getVideoViews(response.influencer)
          // setInfluencerViews(response.infData)
      })
      .catch(e => {
          console.log(e)
      })
  };
  const gather_influencer_views_percent = () => {
    CampaignDataService.get(props.campaign_id)
    .then(response => {
        let influencers_array = response.data.influencers
        let influencer_views_percent_array = []
        for(let i = 0; i < influencers_array.length; i = i + 1){
          let username_string = influencers_array[i].username_string
          let viewsNum = influencers_array[i].views_num/sumViews*100
          let views = viewsNum.toFixed(2); //convert number to string
          // let result = viewsStr.substring(0,2)  // cut six first character
          // let views = parseInt(result);
          influencer_views_percent_array.push({id: username_string, value: views})
        }
        setInfluencerViewsPercent(influencer_views_percent_array)
        
    })
    .catch(e => {
        console.log(e)
    })
};
console.log(influencer_views_percent)
    const colorsPallete = ["#f40060","#E1005E","#CF005D","#BC005B","#A9005A","#960058","#840057","#710055","#5E0054","#4B0052","#390051","#26004F"]
    const colorsPallete2 = ["#F40060","#E9115D","#DE235A","#D33457","#C84554","#BD5751","#B3684D","#A87A4A","#9D8B47","#929C44","#87AE41","#7CBF3E"]
    const colorsPallete3 = ["#6200F5","#8C00F5","#B600F5","#E000F5","#F500E0","#F500B6","#F5008C","#FF67A4","#FF7AAF","#F40060","#D10075","#C00080","#AE008B","#9D0095","#7A00AB"]
    // const notify = () => toast('Here is your toast.');
    const toastId = React.useRef(null);
    const ErrorMsg = ({ closeToast, toastProps }) => (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg> 
        <div style={{display:"inline", paddingLeft:"3%"}}>
        Error: <u><strong>Historical data</strong></u> required
        </div>
      </div>
    )
    const SuccessMsg = ({ closeToast, toastProps }) => (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        <div style={{display:"inline", paddingLeft:"3%"}}>
          Success: <u><strong>Historical data</strong></u> loaded
        </div>
      </div>
    )
    const viewsId = "v1";
    const showError = () =>{
      if (historical_views != 0) {
        toast.success(<SuccessMsg />, {
          toastId: viewsId,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      }
      else {
        toast.error(
            <ErrorMsg />,
          {
          // delay: 2000,
          toastId: viewsId,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    }
    const totHistViewsPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Total Historical Views</Popover.Title>
        <Popover.Content>
          Number of post views on a specific date <em>following</em> the date influencer was added to the campaign.
        </Popover.Content>
      </Popover>
    );
    const viewsPerPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Views per Influencer</Popover.Title>
        <Popover.Content>
          Proportional representation of the total sum of views contributed by <em>each influencer</em>.
        </Popover.Content>
      </Popover>
    );
    
    useEffect(() => {
        //   console.log(props.match.params.id)
          gather_historical_views();
          gather_influencer_views();
          showError();
          gather_influencer_views_percent();
          setTotalView();
          // sumComma();
        //   only will get called if id is updated
      }, [props.campaign_id]);
  
      const [showAlert, setShowAlert] = useState(true);
      const toggleShowAlert = () => setShowAlert(!showAlert);
    const renderLineChart = (
      <div>
        { historical_views ? (
          <LineChart width={1000} height={500} data={historical_views} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                    <Legend verticalAlign="top" height={36} layout="vertical"/>
                    <Line type="monotone" dataKey="views" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
        ) : (
            <div className="text-center" style={{marginTop:"-10%"}}>
              {/* <ToastContainer> */}
                {/* <Toast style={{float:"right", marginTop:"10%"}} position="top-right"show={showAlert} bg="Secondary" onClose={toggleShowAlert} animation={true}>
                  <Toast.Header>
                    <img src="../rmLogo.png" className="rounded-circle me-2" width="15%" />
                    <strong className="me-auto">Error</strong>
                    <small>Now</small>
                  </Toast.Header>
                  <Toast.Body>Trouble loading historical data. Historical data required.</Toast.Body>
                </Toast> */}
                
                {/* <cogoToast.info("This is an info message", { position: 'top-center', heading: 'Information' }) /> */}
              {/* </ToastContainer> */}
                <ContentLoader width={300} height={300} speed={3} backgroundColor={'#f40060'} foregroundColor={'#3f0350'} viewBox="0 0 200 200" {...props}>
                  <rect x="0" y="160" rx="0" ry="0" width="25" height="40" />
                  <rect x="30" y="145" rx="0" ry="0" width="25" height="55" />
                  <rect x="60" y="126" rx="0" ry="0" width="25" height="74" />
                  <rect x="90" y="80" rx="0" ry="0" width="25" height="120" />
                  <rect x="120" y="142" rx="0" ry="0" width="25" height="58" />
                </ContentLoader>
            </div>
        )}
        
      </div> 
      );

      const RADIAN = Math.PI / 180;
      const render_pie_labels = ({ cx, cy, midAngle, innerRadius, outerRadius, value, color, startAngle, endAngle, percent, index }) => {
        // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        // const x = cx + radius * Math.cos(-midAngle * RADIAN);
        // const y = cy + radius * Math.sin(-midAngle * RADIAN);
        const diffAngle = endAngle - startAngle;
        const delta = ((360-diffAngle)/15)-1;
        const radius = innerRadius + (outerRadius - innerRadius);
        const x = cx + (radius+delta) * Math.cos(-midAngle * RADIAN);
        const y = cy + (radius+(delta*delta)) * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontWeight="normal">
            {`${(percent * 100).toFixed(0)}%`}
            {/* {data[index].name} ({value}) */}
          </text>
        );
      };
      const renderCustomizedLabelLine = (props) =>{
        let { cx, cy, midAngle, innerRadius, outerRadius, color, startAngle, endAngle } = props;
        const RADIAN = Math.PI / 180;
        const diffAngle = endAngle - startAngle;
        const radius = innerRadius + (outerRadius - innerRadius);
        let path='';
        for(let i=0;i<((360-diffAngle)/15);i++){
          path += `${(cx + (radius+i) * Math.cos(-midAngle * RADIAN))},${(cy + (radius+i*i) * Math.sin(-midAngle * RADIAN))} `
        }
        return (
          <polyline points={path} stroke={color} fill="none" />
        );
      }
      const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }

        return null;
    };
    // const renderPieChart = (
    //     // <ResponsiveContainer width="6250%" height="3125%">
    //     // historical_views = [{views: 100, user: 'kyle'},{views: 200},{views: 400}]
    //     <PieChart width={1000} height={500} >
    //           <Tooltip content={<CustomTooltip />} />
    //           <Legend align="right" verticalAlign="middle" height={36} layout="vertical" />

    //         <Pie data={influencer_views} color="#000000" dataKey='views' legendType='square' outerRadius={200} paddingAngle={3} label fill="#f40060">
    //           {data.map((entry, index) => (
                
    //             <Cell key={`cell-${entry}`} fill={colors[index % colors.length]} label = {render_pie_labels} labelLine={renderCustomizedLabelLine}/>
    //             ))}
    //         </Pie>
            
    //         {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
            
    //         <Tooltip />
    //       </PieChart>
          

    //     // </ResponsiveContainer>

    // );

    // *****Value in center of pie******
  //   const CenteredMetric = ({ centerX, centerY }) => {
  //     let total = 0
  //     influencer_views.forEach(datum => {
  //         total += datum.value
  //     })
  //     return (
  //         <text
  //             x={centerX}
  //             y={centerY}
  //             textAnchor="middle"
  //             dominantBaseline="central"
  //             style={{
  //                 fontSize: '40px',
  //                 fontWeight: 600,
  //             }}
  //         >
  //             {total}
  //             {/* 1000 */}
  //         </text>
  //     ) 
  // }
  // setSumView(totalView)
  const CenteredTital = ({ centerX, centerY }) => {
    // let total = 0
    // dataWithArc.forEach(datum => {
    //     total += datum.value
    // })
    // let totNum = (totalView).toLocaleString('en')
    let adjustedY = centerY*.75
    return (
        <text
            x={centerX}
            y={adjustedY}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
                fontSize: '2.5vw',
                fontWeight: 600,
                // textAlign: "justify",
                overflowWrap: "anywhere",
            }}
        >
            Total: 
        </text>
    )
}
const CenteredTotal = ({ centerX, centerY }) => {
  // let total = 0
  // dataWithArc.forEach(datum => {
  //     total += datum.value
  // })
  // let totNum = (totalView).toLocaleString('en')
  return (
      <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
              fontSize: '2.5vw',
              fontWeight: 600,
              // textAlign: "justify",
              overflowWrap: "anywhere",
          }}
      >
        {totalComma}
      </text>
  )
}
    const renderPieChart = (
      <div style={{height: 650}}>
        
      <ResponsivePie
          data={ influencer_views_percent }
          // width={1000} 
          // height={500}
          id={influencer_views_percent.id}
          value={influencer_views_percent.value}
          margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
          innerRadius={0.55}
          arcLabelsRadiusOffset={0.55}
          motionConfig= 'gentle'
          padAngle={0.8}
          cornerRadius={5}
          activeOuterRadiusOffset={8}
          // colors={{ scheme: 'pink_yellowGreen' }}
          // colors={{ scheme: 'red_purple' }}
          // colors={ colorsPallete }
          // colors={ colorsPallete2 }
          colors={ colorsPallete3 }
          arcLinkLabelsOffset={2}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
          arcLinkLabelsSkipAngle={3}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          // ******fix % on tooltip hover + add actual value on tooltip
          arcLinkLabel={d => `${d.id}: ${d.value}%`}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}        
          arcLabelsRadiusOffset={0.70}
          arcLinkLabelsDiagonalLength={25}
          arcLinkLabelsTextOffset={8}
          arcLinkLabelsStraightLength={35}
          // arcLabelsTextColor="#333333"
          arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
          activeInnerRadiusOffset={8}
        // layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
        // Make icon colors associated w pie
        layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredTital, CenteredTotal]}
        arcLabelsComponent={({ datum, label, style, CenteredTital, CenteredTotal }) => (
          <animated.g transform={style.transform} style={{ pointerEvents: 'none' }}>
              <circle fill={style.textColor} cy={6} r={15} />
              <circle fill="#242424" stroke={datum.color} strokeWidth={2} r={16} />
              <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={"white"}
                  style={{
                      fontSize: 10,
                      fontWeight: 800,
                  }}
              >
                  {label}%
              </text>
          </animated.g>
      )}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  value: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
            { match: d => d.value > 10, id: 'squares' },
            { match: influencer_views => influencer_views.id === "oscarinking", id: 'lines' }
          ]}
          legends={[
              {
                  anchor: 'right',
                  direction: 'column',
                  justify: false,
                  translateX: 140,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 60,
                  itemHeight: 20,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  itemsSpacing: 10,
                  symbolSize: 20,
                  symbolShape: 'circle'
              }
          ]}
      />
      </div>
  );

    return(
      <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      {/* </div>
      <div> */}
        <div className="lineViews">
          <Card>
            <Card.Header style={{fontWeight:"bold", color:"#f40060" }}>
              Historical Total Views
              <OverlayTrigger trigger="hover" placement="bottom" overlay={totHistViewsPopover}>
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
        <div className="pieViews">
          <Card>
            <Card.Header style={{fontWeight:"bold", color:"#f40060" }}>
              Views per Influencer
              <OverlayTrigger trigger="hover" placement="bottom" overlay={viewsPerPopover}>
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

export default ViewsChart