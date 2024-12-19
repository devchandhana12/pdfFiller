import React from "react";
import PieChartWidget from './GraphWidget';
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
const data = [
  { name: "Page A", value: 400 },
  { name: "Page B", value: 300 },
  { name: "Page C", value: 200 },
  { name: "Page D", value: 278 },
  { name: "Page E", value: 100 },
  { name: "Page F", value: 178 },
];

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        // justifyContent:"ju"
      }}
    >
      <PieChartWidget
        data={data}
        innerRadius={60}
        outerRadius={150}
        minHeight={1000}
        minWidth={1000}
      />
      <LineGraph />
      <BarGraph />
    </div>
  );
};

export default App;
