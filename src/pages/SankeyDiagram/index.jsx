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
    const currencyMap = {};
    const nodesSet = new Set();
    const links = sankeyData.map(item => {
      const source = item.from;
      const target = item.to;
      const price = item.totalCost?.USD ? item.totalCost?.USD : item.totalCost?.GBP;
      const currency = item.cost;
      nodesSet.add(source);
      nodesSet.add(target);

      // sum prices for unique "from"
      priceMap[source] =  price;
      currencyMap[source] = currency || {};

      return {
        source,
        target,
        value: price
      };
    });
    const nodes = Array.from(nodesSet).map(name => ({
      name,
      price: priceMap[name] || 0,
      currency: currencyMap[name] || ""
    }));
    console.log("nodes", nodes);
    // ---- 2️⃣ Create ECharts instance ----
    chartInstance.current = echarts.init(chartRef.current);

    const option = {
      title: {
        text: "Sankey Diagram",
        left: "left"
      },
      tooltip: {
        trigger: "item",
        formatter: params => {
          if (params.dataType === "node") {
            return `${params.data.name}<br/>Price: ${params.data.currency.USD ? "$" : "£"} ${params.data.price.toFixed(2)}`;
          }
          return `${params.data.source} → ${params.data.target}<br/>Value: ${params.data.value}`;
        }
      },
      series: [
        {
          type: "sankey",
          data: nodes,
          links: links,
           emphasis: {
            focus: "adjacency",
            blurScope: "global"
          },
          lineStyle: {
            color: "source",
            curveness: 0.3
          },
          nodeWidth: 50,   // increase node width (default: 20)
          nodeGap: 22,     // increase vertical space between nodes (default: 8)
          left: 50,       // margin from left
          right: 80,      // margin from right
          top: 50,         // margin from top
          bottom: 50,      // margin from bottom
           label: {
          show: true,
           distance: 20, // default is 5, increase for more margin
          formatter: function (params) {
            // console.log(params.data.name);
            if(params.data.currency.USD){
              return `${params.name} ( $${ params.data.price.toFixed(2)})`;
            }
            if(params.data.currency.GBP){
              return `${params.name} ( £${ params.data.price.toFixed(2)})`;
            }
          },
          color: "#000",
          fontSize: 13
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

  return <div ref={chartRef} style={{ width: "100%", height: "1300px" }} />;
};

export default SankeyDiagram;
