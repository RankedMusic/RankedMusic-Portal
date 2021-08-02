import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, Pie, PieChart, Cell, BarChart, Label, Bar, LabelList } from 'recharts';
import React, { useState, useEffect } from "react";
import CampaignDataService from "../services/campaign";
import Card from 'react-bootstrap/Card'
import { Form, Row, Col, Tab, Tabs, Nav, FormControl, Button, Table, FormCheck, OverlayTrigger, Popover} from 'react-bootstrap';
import { ResponsivePieCanvas } from '@nivo/pie'
import { ResponsivePie } from '@nivo/pie'
import { animated } from '@react-spring/web'
import ContentLoader from 'react-content-loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FollowersChart = props => {
    const [historical_followers, setHistoricalFollowers] = useState(null)
    const [influencer_followers, setInfluencerFollowers] = useState([])
    const [influencer_followers_percent, setInfluencerFollowersPercent] = useState([])
    const data = [{name: 'Jun 30 2021', uv: 400, pv: 2400, amt: 2400}, {name: 'July 01 2021', uv: 600, pv: 2400, amt: 2400}, {name: 'July 02 2021', uv: 760, pv: 2400, amt: 2400}];
    const [totalFollower, setTotalFollower] = useState(null)
    const [totalComma, setTotalComma] = useState(null)

    const gather_historical_followers = () => {        
        CampaignDataService.getHistoricalFollowersArray({campaign_id: props.campaign_id})
        .then(response => {
            // console.log(response.data)
            setHistoricalFollowers(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    };
    let sumFollowers = 0;
    const gather_influencer_followers = () => {
      // [{name: 'Jun 30 2021', uv: 400, pv: 2400, amt: 2400}, {name: 'July 01 2021', uv: 600, pv: 2400, amt: 2400}, {name: 'July 02 2021', uv: 760, pv: 2400, amt: 2400}]
      
      CampaignDataService.get(props.campaign_id)
      .then(response => {
          let influencers_array = response.data.influencers
          // console.log(influencers_array)
          let influencer_followers_array = []
          for(let i = 0; i < influencers_array.length; i = i + 1){
            let username_string = influencers_array[i].username_string
            
           
            let followers = influencers_array[i].num_followers
            sumFollowers+=followers
            // console.log('Username for pie chart is ' + only_username + ' and has ' + followers + ' followers')
            influencer_followers_array.push({id: username_string, value: followers})
          }
          // NOTE: influencer_followers_array is an array of objects of the form [{username: 'name', followers: 324}, ...]
          // console.log(influencer_followers_array)
          setInfluencerFollowers(influencer_followers_array)
          setTotalFollower(sumFollowers);

          let followers_commas = (sumFollowers).toLocaleString('en')  
          // console.log('We have a total of ' + comments_commas + ' comments');
          setTotalComma(followers_commas);
      })
      .catch(e => {
          console.log(e)
      })
  };
  const gather_influencer_followers_percent = () => {
    CampaignDataService.get(props.campaign_id)
    .then(response => {
        let influencers_array = response.data.influencers
        let influencer_followers_percent_array = []
        for(let i = 0; i < influencers_array.length; i = i + 1){
          let username_string = influencers_array[i].username_string
          let followersNum = influencers_array[i].num_followers/sumFollowers*100
          let followers = followersNum.toFixed(2); //convert number to string
          // let result = followersStr.substring(0,2)  // cut six first character
          // let followers = parseInt(result);
          influencer_followers_percent_array.push({id: username_string, value: followers})
        }
        setInfluencerFollowersPercent(influencer_followers_percent_array)
    })
    .catch(e => {
        console.log(e)
    })
};
    const colorsPallete3 = ["#6200F5","#8C00F5","#B600F5","#E000F5","#F500E0","#F500B6","#F5008C","#FF67A4","#FF7AAF","#F40060","#D10075","#C00080","#AE008B","#9D0095","#7A00AB"]
    const toastId = React.useRef(null);
    const ErrorMsg = ({ closeToast, toastProps }) => (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg> 
        <div style={{display:"inline", paddingLeft:"3%"}}>
          <strong>Error:</strong> Historical <strong>followers</strong> data required
        </div>
      </div>
    )
    const SuccessMsg = ({ closeToast, toastProps }) => (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        <div style={{display:"inline", paddingLeft:"3%"}}>
          <strong>Success:</strong> Historical <strong>followers</strong> data loaded
        </div>
      </div>
    )
    const followId = "f1";
    const showError = () =>{
      if (historical_followers>0) {
          toast.success(<SuccessMsg />, {
            delay: 3000,
            toastId: followId,
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
          delay: 3000,
          toastId: followId,
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
    const totHistFollowersPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Total Historical Followers</Popover.Title>
        <Popover.Content>
          Number of post followers on a specific date <em>following</em> the date influencer was added to the campaign.
        </Popover.Content>
      </Popover>
    );
    const followersPerPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Followers per Influencer</Popover.Title>
        <Popover.Content>
          Proportional representation of the total sum of followers contributed by <em>each influencer</em>.
        </Popover.Content>
      </Popover>
    );
    const sumComma = () => {
      let followers_commas = (totalFollower).toLocaleString('en')  
      setTotalComma(followers_commas)
    }
    useEffect(() => {
        //   console.log(props.match.params.id)
          gather_historical_followers();
          gather_influencer_followers();
          gather_influencer_followers_percent();
          setTotalFollower();
          // sumComma();
        //   only will get called if id is updated
      }, [props.campaign_id]);
  
    const renderLineChart = (
    <div>
      { historical_followers>0 ? (
        <LineChart width={1000} height={500} data={historical_followers} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
          <Legend verticalAlign="top" height={36} layout="vertical" />
          <Line type="monotone" dataKey="followers" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
    ) : (
      <div className="text-center" style={{marginTop:"-10%"}}>
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
          data={ influencer_followers_percent }
          // width={1000} 
          // height={500}
          id={influencer_followers_percent.id}
          value={influencer_followers_percent.value}
          margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
          innerRadius={0.45}
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
          // ******Divide value from total and add %
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
        arcLabelsComponent={({ datum, label, style, CenteredTotal }) => (
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
            { match: influencer_followers => influencer_followers.id === "oscarinking", id: 'lines' }
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
        {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        /> */}
        <div className="lineFollowers">
          <Card>
            <Card.Header style={{fontWeight:"bold", color:"#f40060" }}>
              Historical Total Followers
              <OverlayTrigger trigger="hover" placement="bottom" overlay={totHistFollowersPopover}>
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
        <div className="pieFollowers">
          <Card>
            <Card.Header style={{fontWeight:"bold", color:"#f40060" }}>
                Followers per Influencer
              <OverlayTrigger trigger="hover" placement="bottom" overlay={followersPerPopover}>
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

export default FollowersChart