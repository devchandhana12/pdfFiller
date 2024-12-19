import React from "react";
import PieChartWidget from './GraphWidget';
const data = [
  { name: "Page A", value: 400 },
  { name: "Page B", value: 300 },
  { name: "Page C", value: 200 },
  { name: "Page D", value: 278 },
];

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <PieChartWidget
        data={data} innerRadius={100} outerRadius={200}      
      />
    </div>
  );
};

export default App;
