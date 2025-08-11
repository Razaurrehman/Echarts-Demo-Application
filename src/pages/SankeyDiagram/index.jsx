import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import sankeyData from "../../Constants/senkeyChartData.json"; // path to your file

const SankeyDiagram = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // ---- 1️⃣ Build unique node list with price ----
    const priceMap = {};
    const nodesSet = new Set();
    const links = sankeyData.map(item => {
      const source = item.from;
      const target = item.to;
      const price = item.totalCost?.USD ? item.totalCost?.USD : item.totalCost?.GBP;

      nodesSet.add(source);
      nodesSet.add(target);

      // sum prices for unique "from"
      priceMap[source] =  price;

      return {
        source,
        target,
        value: price // link width
      };
    });

    const nodes = Array.from(nodesSet).map(name => ({
      name,
      price: priceMap[name] || 0
    }));

    // ---- 2️⃣ Create ECharts instance ----
    chartInstance.current = echarts.init(chartRef.current);

    const option = {
      title: {
        text: null,
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: params => {
          if (params.dataType === "node") {
            return `${params.data.name}<br/>Price: ${params.data.price}`;
          }
          return `${params.data.source} → ${params.data.target}<br/>Value: ${params.data.value}`;
        }
      },
      series: [
        {
          type: "sankey",
          data: nodes,
          links: links,
          emphasis: { focus: "adjacency" },
          lineStyle: {
            color: "source",
            curveness: 0.5
          },
           label: {
          show: true,
           distance: 20, // default is 5, increase for more margin
          formatter: function (params) {
            return `${params.name} ($${params.data.price.toFixed(2)})`;
          },
          color: "#000",
          fontSize: 10
           },
        nodeAlign: "center" // keep sources aligned left
        }
      ]
    };

    chartInstance.current.setOption(option);

    // ---- 3️⃣ Resize listener ----
    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "1000px" }} />;
};

export default SankeyDiagram;
