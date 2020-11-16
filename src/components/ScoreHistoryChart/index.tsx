import React, { useRef, useState, useEffect } from 'react';
import './index.less';
import ChartJS from 'chart.js';
import BackLink from '../BackLink';

const chartConfig = {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Score',
        data: [],
        fill: false,
        borderColor: 'blue',
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Score History',
    },
  },
};

const ScoreHistoryChart = (props: { location: { state: { data: any } } }) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    chartConfig.data.datasets[0].data = props.location.state.data;
  }, []);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      console.log(chartConfig.data);
      new ChartJS(chartContainer.current, chartConfig);
    }
  }, [chartContainer]);

  return (
    <div>
      <BackLink to="../" />
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ScoreHistoryChart;
