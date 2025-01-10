import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ title, type, data }) => {
  const options = {
    title: {
      text: title,
    },
    credits: {
        enabled: false,
      },  
    series: [
      {
        type: type,
        data: data,
      },
    ],
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;