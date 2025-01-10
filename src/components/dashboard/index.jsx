import React from "react";
import NumberTiles from "./NumberTiles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./dashboard.scss";
import { numberTileList } from "./dashboard.description";

const Dashboard = () => {
  const chartData = {
    'My Orders': [
      { name: 'Orders Not Processed', y: 29.9 },
      { name: 'Order In Progress', y: 71.5 },
      { name: 'Order Delivered', y: 106.4 },
    ],
    'My Transactions': [
      { name: 'Transaction Completed', y: 34.9 },
      { name: 'Transaction Pending', y: 54.5 },
      { name: 'Transaction Failed', y: 76.4 },
      { name: 'Transaction Cancelled', y: 76.4 },
    ],
    'My Subscriptions': [
      { name: 'Total Amount', y: 40.9 },
      { name: 'Subscription Amount', y: 20.9 },
    ],
    'My Investments': [
      { name: 'Total Investments Amount', y: 10.9 },
      { name: 'Total Stock Units', y: 30.5 },
    ],
    'My Cashpoints': [
      { name: 'My Cashpoints', y: 5.9 },
      { name: 'Total Cashpoints', y: 15.5 },
    ],
    'My Profits': {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'My Profits',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%',
        },
      },
      series: [
        {
          name: 'Profits',
          innerSize: '50%',
          data: [
            { name: 'Total Profits', y: 2000 },
            { name: 'My Profits', y: 100 },
          ],
        },
      ],
    },
  };

  const chartTypes = {
    'My Orders': 'pie',
    'My Transactions': 'bar',
    'My Subscriptions': 'line',
    'My Investments': 'column',
    'My Profits': 'semi-circle-donut',
    'My Cashpoints': 'area',
  };

  // Define a color palette for each chart type
  const colorPalette = {
    'My Orders': ['#FF5733', '#33FF57', '#3357FF'], // Red, Green, Blue
    'My Transactions': ['#FFC300', '#FF5733', '#C70039', '#900C3F'], // Yellow, Red, Dark Red, Darker Red
    'My Subscriptions': ['#DAF7A6', '#FFC300'], // Light Green, Yellow
    'My Investments': ['#581845', '#900C3F'], // Dark Purple, Dark Red
    'My Profits': ['#C70039', '#FF5733'], // Dark Red, Red
    'My Cashpoints': ['#FF5733', '#33FF57'], // Red, Green
  };

  return (
    <div className="d-flex flex-column h-100 w-100">
      <div className="dashboard-number-tiles">
        {numberTileList.map((value) => {
          return (
            <div className="tiles-wrapper" key={value?.key}>
              <NumberTiles
                title={value?.title}
                count={value?.count}
                color={value?.color}
                disabled={value?.disabled}
                footerTitle={value?.footerTitle}
                suffix={value?.suffix}
                prefix={value?.prefix}
              />
            </div>
          );
        })}
      </div>
      <div className="charts-container">
        {numberTileList.map((value) => {
          const chartConfig = value.title === 'My Profits' 
            ? chartData[value.title]
            : {
                chart: { type: chartTypes[value.title] },
                title: { text: value.title },
                series: [
                  {
                    data: chartData[value.title],
                    colors: colorPalette[value.title],
                  },
                ],
                colors: colorPalette[value.title],
              };

          return (
            <div className="chart-wrapper" key={value?.key}>
              <HighchartsReact highcharts={Highcharts} options={chartConfig} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;