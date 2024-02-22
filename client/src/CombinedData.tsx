import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { Pie, Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

function CombinedData({ data }) {
  // const [month, setMonth] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using Axios from the /combined-data endpoint
        const response = await axios.get(
          "http://localhost:3000/combined-data",
          {
            params: { month:  data || 3 },
          },
        );

        // Extract data from the response
        const { statistics, barChartData, pieChartData } = response.data;

        // Set state with the fetched data
        setStatistics(statistics);
        setBarChartData(barChartData);
        setPieChartData(pieChartData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [data]); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount
  

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };


  return (
    <div className="container">
      <h1>Statistics {data}</h1>
      <div className="stats">
        {statistics && (
          <div>
            <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
            <p>Sold Items: {statistics.soldItems}</p>
            <p>Not Sold Items: {statistics.notSoldItems}</p>
          </div>
        )}
      </div>
      <h1>Bar Chart Data</h1>
      <div className="barchart">
        <div className="data">
        {barChartData && (
          <ul>
            {barChartData.map((item: { range: React.Key | null | undefined; count: any; }) => (
              <li key={item.range}>{`${item.range}: ${item.count} items`}</li>
            ))}
          </ul>
        )}
        </div>
        <div className="chart">
        {barChartData && (
          <Bar
            data={{
              labels: barChartData.map((item: { range: any; }) => item.range),
              datasets: [{
                data: barChartData.map((item: { count: any; }) => item.count),
                backgroundColor: barChartData.map(() => generateRandomColor()), // Generate colors dynamically
              }],
            }}
            options={{
              title: {
                display: true,
                text: 'Class Strength',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        )}
        </div>
      </div>
      <h1>Pie Chart Data</h1>
      <div className="piechart">
        <div className="data">
        {pieChartData && (
          <ul>
            {pieChartData.map((item: { category: React.Key | null | undefined; count: any; }) => (
              <li
                key={item.category}
              >{`${item.category}: ${item.count} items`}</li>
            ))}
          </ul>
        )}
        </div>
        <div className="chart">
        {pieChartData && (
          <Pie
            data={{
              labels: pieChartData.map((item: { category: any; }) => item.category),
              datasets: [{
                data: pieChartData.map((item: { count: any; }) => item.count),
                backgroundColor: pieChartData.map(() => generateRandomColor()), // Generate colors dynamically
              }],
            }}
            options={{
              title: {
                display: true,
                text: 'Class Strength',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        )}
        </div>
      </div>
      
    </div>

    
  );
}

export default CombinedData;
