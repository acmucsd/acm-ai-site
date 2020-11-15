import React, {useRef, useState, useEffect} from 'react';
import './index.less';
import ChartJS from 'chart.js'

const chartConfig = {
  type: 'line',
  data: {
    datasets : [{
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
        console.log(chartConfig.data)
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
