import React, { useState } from "react";
import PieChartWidget from "./GraphWidget";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(RGL);

const initialLayout = [
  { i: "pieChart", x: 0, y: 0, w: 1, h: 2 }, // Pie Chart
  { i: "lineGraph1", x: 1, y: 0, w: 1, h: 2 }, // Line Graph 1
  { i: "barGraph1", x: 2, y: 0, w: 1, h: 2 }, // Bar Graph 1
  { i: "lineGraph2", x: 0, y: 2, w: 1, h: 2 }, // Line Graph 2
  { i: "barGraph2", x: 1, y: 2, w: 1, h: 2 }, // Bar Graph 2
  { i: "barGraph3", x: 2, y: 2, w: 1, h: 2 }, // Bar Graph 3
];

const App = () => {
  const [layout, setLayout] = useState(initialLayout);

  const data = [
    { name: "Page A", value: 400 },
    { name: "Page B", value: 300 },
    { name: "Page C", value: 200 },
    { name: "Page D", value: 278 },
    { name: "Page E", value: 100 },
    { name: "Page F", value: 178 },
  ];

  const onLayoutChange = (currentLayout) => {
    setLayout(currentLayout);
  };

  return (
    <div style={{ maxHeight: 800, height: 800 }}>
      <ResponsiveReactGridLayout
        className="layout"
        // layouts={{ lg: layout }}
        layout={layout}
        // cols={{ lg: 3 }}
        cols={3}
        rowHeight={200}
        useCSSTransforms={true}
        maxRows={2}
        allowOverlap={false}
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-handle"
      >
        <div
          key="pieChart"
          className="drag-handle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PieChartWidget
            data={data}
            innerRadius={50}
            outerRadius={100}
            minWidth={300}
            minHeight={300}
          />
        </div>
        <div
          key="lineGraph1"
          className="drag-handle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LineGraph />
        </div>
        <div
          key="barGraph1"
          className="drag-handle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarGraph />
        </div>
        <div
          key="lineGraph2"
          className="drag-handle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LineGraph />
        </div>
        <div
          key="barGraph2"
          className="drag-handle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarGraph />
        </div>
        <div
          key="barGraph3"
          className="drag-handle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarGraph />
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default App;
