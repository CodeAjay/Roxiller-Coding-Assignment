import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

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

  // const pichartdata = {
  //   labels: pieChartData.map((item: { category: any; }) => item.category),
  //   datasets: [
  //     {
  //       data: pieChartData.map((item: { count: any; }) => item.count),
  //       backgroundColor: ['red', 'blue', 'yellow', 'green'],
  //     },
  //   ],
  // };

  // const barchartdata = {
  //   labels: barChartData.map((item: { range: any; }) => item.range),
  //   datasets: [
  //     {
  //       label: 'Count',
  //       data: barChartData.map((item: { count: any; }) => item.count),
  //       backgroundColor: 'rgba(54, 162, 235, 0.6)',
  //       borderColor: 'rgba(54, 162, 235, 1)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // console.log(pichartdata);
  // console.log(barchartdata);
  

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
        {barChartData && (
          <ul>
            {barChartData.map((item: { range: React.Key | null | undefined; count: any; }) => (
              <li key={item.range}>{`${item.range}: ${item.count} items`}</li>
            ))}
          </ul>
        )}
      </div>
      <h1>Pie Chart Data</h1>
      <div className="piechart">
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
      
    </div>

    
  );
}

export default CombinedData;
