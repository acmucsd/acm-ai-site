import React, {useRef, useState, useEffect} from 'react';
import './index.less';
import ChartJS from 'chart.js'

const chartConfig = {
  type: 'line',
  data: {
    datasets: [{
        label: 'Score',
        data: [],
        fill: false,
        borderColor: 'blue'
    }]
  },
  options: {
    responsive: true,
    title: {
      display:true,
      text: "Score History"
    },
    scales: {
      xAxes: [{
          type: 'time',
          time: {
              stepSize: 12,
              format:'DD/MM/YYYY',
              tooltipFormat: 'll',
              displayFormats: {
                day: 'MMM D',
                hour: 'MMM D hA'
              }
          },
          scaleLabel: {
            display:     true,
            labelString: 'Date'
        }
      }]
    } 
  }
}

const ScoreHistoryChart = (props : {location: {state: {data: any}}}) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<ChartJS>();

  useEffect(() => {
    chartConfig.data.datasets[0].data = props.location.state.data;
  }, [])

  useEffect(() => {
    if(chartContainer && chartContainer.current){
        const newChartInstance = new ChartJS(chartContainer.current, chartConfig);
        setChartInstance(newChartInstance);
    }
  }, [chartContainer])

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  )
}


export default ScoreHistoryChart
