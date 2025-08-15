import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import rawData from "../../Constants/treeMapData.json";

const TreeMap = () => {
  const treeMapChartRef = useRef(null);
  const treeMapchartInstance = useRef(null);

  // Recursive mapping
  function mapData(node) {
    return {
      name: node.formattedLabel || node.name,
      value: node.cost?.GBP ?? node.value ?? 0,
      children: [
        ...(node.children?.map(mapData) || []),
        ...(node.hiddenChildren?.map(mapData) || [])
      ]
    };
  }

  useEffect(() => {
    if (!treeMapChartRef.current) return;

    if (!treeMapchartInstance.current) {
      treeMapchartInstance.current = echarts.init(treeMapChartRef.current);
    }

    const mappedData = rawData.map(mapData);
    console.log(mappedData);

    const option = {
      tooltip: {
        formatter: (info) => {
          return `${info.name}: £${info.value}`;
        }
      },
      series: [
        {
          type: "treemap",
          roam: false, // no zoom/pan
          nodeClick: false, // disable zoom on node click
          label: {
            show: true,
            formatter: "{b}"
          },
          data: mappedData
        }
      ]
    };

    treeMapchartInstance.current.setOption(option);

    // // Handle custom click event
    // treeMapchartInstance.current.on("click", (params) => {
    //   if (params.data?.hiddenChildren && params.data.hiddenChildren.length) {
    //     // merge hidden children into children
    //     const newChildren = [
    //       ...(params.data.children || []),
    //       ...params.data.hiddenChildren.map(mapData)
    //     ];

    //     params.data.children = newChildren;
    //     params.data.hiddenChildren = [];

    //     treeMapchartInstance.current.setOption({
    //       series: [
    //         {
    //           type: "treemap",
    //           data: mappedData
    //         }
    //       ]
    //     });
    //   }
    // });

    // return () => {
    //   treeMapchartInstance.current?.dispose();
    // };
  }, []);

  return <div ref={treeMapChartRef} style={{ width: "100%", height: "800px" }} />;
};

export default TreeMap;
