import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import sankeyData from "../../Constants/senkeyChartData.json";
import "bootstrap/dist/css/bootstrap.min.css";

const SankeyDiagram = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // store full nodes and links for reset
  const fullNodes = useRef([]);
  const fullLinks = useRef([]);

  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0, node: null });

  useEffect(() => {
    if (!chartRef.current) return;

    const priceMap = {};
    const currencyMap = {};
    const nodesSet = new Set();
    const links = sankeyData.map((item) => {
      const source = item.from;
      const target = item.to;
      const fromDimension = item.fromDimension;
      const toDimension = item.toDimension;
      const price = item.totalCost?.USD
        ? item.totalCost?.USD
        : item.totalCost?.GBP;
      const currency = item.cost;
      nodesSet.add(source);
      nodesSet.add(target);

      priceMap[source] = price;
      currencyMap[source] = currency || {};

      return { source, target,fromDimension,toDimension, value: price };
    });

    const nodes = Array.from(nodesSet).map((name) => ({
      name,
      price: priceMap[name] || 0,
      currency: currencyMap[name] || "",
    }));

    fullNodes.current = nodes;
    fullLinks.current = links;

    chartInstance.current = echarts.init(chartRef.current);

    const option = getChartOption(nodes, links);

    chartInstance.current.setOption(option);

    // Click event to show menu
    chartInstance.current.on("click", function (params) {
      if (params.dataType === "node") {
        const { event } = params;
        setMenu({
          visible: true,
          x: event.offsetX,
          y: event.offsetY,
          node: params.data.name,
        });
      } else {
        setMenu({ visible: false, x: 0, y: 0, node: null });
      }
    });

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  const getChartOption = (nodes, links) => ({
    title: { text: "Sankey Diagram", left: "left" },
    tooltip: { show: false }, // 🚫 Disabled tooltip
    // tooltip: {
    //   trigger: "item",
    //   formatter: (params) => {
    //     if (params.dataType === "node") {
    //       return `${params.data.name}<br/>Price: ${
    //         params.data.currency.USD ? "$" : "£"
    //       } ${params.data.price.toFixed(2)}`;
    //     }
    //     return `${params.data.source} → ${params.data.target}<br/>Value: ${
    //       params.data.value
    //     }`;
    //   },
    // },
    series: [
      {
        type: "sankey",
        data: nodes,
        links: links,
        draggable: false,
        emphasis: { focus: "adjacency", blurScope: "global" },
        lineStyle: { color: "source", curveness: 0.3 },
        nodeWidth: 50,
        nodeGap: 22,
        left: 50,
        right: 80,
        top: 50,
        bottom: 50,
        label: {
          show: true,
          distance: 20,
          formatter: function (params) {
            if (params.data.currency.USD) {
              return `${params.name} ($${params.data.price.toFixed(2)})`;
            }
            if (params.data.currency.GBP) {
              return `${params.name} (£${params.data.price.toFixed(2)})`;
            }
            return params.name;
          },
          color: "#000",
          fontSize: 13,
        },
        nodeAlign: "center",
      },
    ],
  });

  const filterChart = (nodeName) => {
    const type = fullLinks.current.find((f) => f['source'] === nodeName).fromDimension || null;
    if(!type) return;
    const filteredLinks = fullLinks.current.filter(
      (link) => link.fromDimension === type
    );

    const filteredNodesSet = new Set();
    filteredLinks.forEach((link) => {
      filteredNodesSet.add(link.source);
      filteredNodesSet.add(link.target);
    });

    const filteredNodes = fullNodes.current.filter((node) =>
      filteredNodesSet.has(node.name)
    );

    chartInstance.current.setOption(getChartOption(filteredNodes, filteredLinks));
    setMenu({ visible: false, x: 0, y: 0, node: null });
  };

  const resetChart = () => {
    chartInstance.current.setOption(
      getChartOption(fullNodes.current, fullLinks.current)
    );
    setMenu({ visible: false, x: 0, y: 0, node: null });
  };

  return (
    <div style={{ position: "relative" }}>
      <div ref={chartRef} style={{ width: "100%", height: "1300px" }} />

      {menu.visible && (
        <div
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: menu.y,
            left: menu.x,
            zIndex: 10,
          }}
        >
          <button
            className="dropdown-item"
            onClick={() => filterChart(menu.node)}
          >
            Filter
          </button>
          <button className="dropdown-item" onClick={resetChart}>
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default SankeyDiagram;
