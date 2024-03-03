import React, { useEffect, useRef, useState } from 'react';
import ChartJS from 'chart.js';
import { Empty, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

/** Configuration for chart graph that removes legend,
 *  horizontal lines and ticks. Customizes line and dot color 
 *  
 */
const chartConfig = {
  type: 'line',
  data: {
    labels: [0],
    datasets: [
      {
        data: [0],
        pointBackgroundColor: 'rgb(18, 113, 255)',
        backgroundColor: (ctx: any) => {
          const canvas = ctx.chart.ctx;
          const containerHeight = canvas.canvas.clientHeight; 

          const gradient = canvas.createLinearGradient(0, -160, 0, containerHeight);
  
          // Adds a gradient under the curve
          gradient.addColorStop(0, 'rgb(18, 113, 255)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.6)');
  
          return gradient;
        },
        borderColor: 'rgb(18, 113, 255)',
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: false,
    },
    legend: {
      display: false
    },
    elements: {
      rectangle: {
        backgroundColor: '', // '' means no color
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          display: true,
          fontColor: "grey"
        },
        gridLines: {
          display: false
        },
    
        angleLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          display: true,
          length: 0,
          fontColor: "grey"
        },
       
        angleLines: {
          display: false
        }
      }],
    },
  },
};


/**
 * Used as an interactive line chart to view a competition team's 
 * submission score history from the competition portal dashboard. 
 * Utilizes a chart.js graph to plot data. 
 * 
 * @param {Array<number>} scoreHistory the team's score history
 * 
 */
const LineChart = ({ scoreHistory }: {scoreHistory: Array<number>}) => {

  // initialize the chart
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<ChartJS | null>(null);
  const [chartTrigger, setTrigger] = useState(false);

  // Metric used to show relative change from previous submission score
  const [scoreHistoryPercentage, setScoreHistoryPercentage] = useState<number>(0);

  console.log(scoreHistory)

  useEffect(() => {
    if(scoreHistory.length != 0) {

        // Find relative growth of scores
        let lastTwo = scoreHistory.slice(-2);
        
        const diff = lastTwo[1] - lastTwo[0];
        const percent = diff / lastTwo[0];
        setScoreHistoryPercentage(percent);
    }
    
    if (chartContainer.current && scoreHistory.length !== 0) {
      const myChartRef = chartContainer.current.getContext('2d');
  
      if (!chart) {
        // Create the chart instance only once during the component mount
        const newChart = new ChartJS(myChartRef!, chartConfig);
        setChart(newChart);
      }
  
      // Update chart data and labels
      chartConfig.data.labels = Array.from({ length: scoreHistory.length }, (_, i) => i + 1);
      chartConfig.data.datasets[0].data = scoreHistory;
  
      // Update the chart
      chart?.update();
    }
  }, [chartTrigger]);



  // Use a second hook to address bug where chartContainer ref does not update in time nor triggers callback
   useEffect(() => {
    setTrigger(true);
    
  }, [scoreHistory]);

  return (
    <>
    {scoreHistory.length == 0 ? 
      // No data available
      <Empty />
      : 
      // Otherwise display the percenage metric and the chart
      <div>
        {scoreHistoryPercentage ?
          <Statistic
              value={Math.abs(scoreHistoryPercentage)}
              precision={2}
              valueStyle={{ color: scoreHistoryPercentage < 0 ? '#cf1322' : '#3f8600', fontSize: "16px", display: "inline" }}
              prefix={scoreHistoryPercentage < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
              suffix="%"
          />
          :
          <></>
        }
        {/* DO NOT remove the max height. ChartJS has a bug where changing the scorehistory
            causes the line graph to grow down infinitely. This can happen whenever the user leaves and 
            joins another team. */}
        <canvas style = {{ width: "100%", margin: "3rem 0", maxHeight: "400px"}} ref={chartContainer} />
      </div>

      }
    </>
    
  )
      
};


export default LineChart;
