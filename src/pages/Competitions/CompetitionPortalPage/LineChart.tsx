import React, { useEffect, useRef, useState } from 'react';
import ChartJS from 'chart.js';
import { Empty } from 'antd';

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
          const containerHeight = canvas.canvas.clientHeight; // Get the height of the container

          const gradient = canvas.createLinearGradient(0, -160, 0, containerHeight);
  
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
        backgroundColor: '', // Change this to the color you want for the entire chart background
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

const LineChart = ({ scoreHistory }: {scoreHistory: Array<number>}) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<ChartJS | null>(null);
  const [chartTrigger, setTrigger] = useState(false);

  console.log(scoreHistory)
  useEffect(() => {
    if (chartContainer && chartContainer.current && scoreHistory.length != 0) {
      const myChartRef = chartContainer!.current!.getContext('2d');
      const newchart = new ChartJS(myChartRef!, chartConfig);
      setChart(newchart);
      chartConfig.data.labels = [];
      for (let i = 0; i < scoreHistory.length; i++) {
        chartConfig.data.labels.push(i + 1);
      }
      chartConfig.data.datasets[0].data = scoreHistory;
      chart?.update();
    }
  }, [chartTrigger]);

   // uses a second hook to address bug where chartContainer ref does not update in time nor triggers callback
   useEffect(() => {
    setTrigger(true);
  }, [scoreHistory]);


  return (
    <>
    {scoreHistory.length == 0 ? 
      <Empty />
      : 
    /* WARNING: DO NOT remove the max height. ChartJS has a bug where changing the scorehistory
     * causes the line graph to grow down infinitely. This can happen whenever the user leaves and 
     * joins another team. 
     */
    <canvas style = {{ width: "100%", margin: "3rem 0", maxHeight: "400px"}} ref={chartContainer} />
    }
    </>
    )
      
};


export default LineChart;
