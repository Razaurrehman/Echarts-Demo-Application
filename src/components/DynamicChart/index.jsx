// DynamicChart.jsx
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const DynamicChart = ({ id, option, height = '400px' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current);

    // Set chart options
    chartInstance.current.setOption(option);

    // Resize chart on window resize
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      chartInstance.current?.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [option]);

  return (
    <div
      id={id}
      ref={chartRef}
      style={{ width: '100%', height }}
    />
  );
};

export default DynamicChart;