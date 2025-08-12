import DynamicChart from '../../components/DynamicChart';
import CompianceHistroyData from "../../Constants/complianceHistroyData.json"; // path to your file


const categories = CompianceHistroyData.map(item => {
  const date = new Date(item.sampledAt);
  const day = String(date.getDate()).padStart(2, '0'); // 01, 02, ...
  const month = date.toLocaleString('default', { month: 'short' }); // Aug
  return `${day} ${month}`;
});

const lineChartOptions = {
  title: {
    text: null,
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: 0,
    data: [
      'Failed High Priority',
      'Failed Medium Priority',
      'Failed Low Priority',
      'Total High Priority',
      'Total Medium Priority',
      'Total Low Priority'
    ]
  },
  xAxis: {
    type: 'category',
    data: categories,
    axisLabel: {
      formatter: value => value // already formatted above
    }
  },
  yAxis: {
    type: 'value',
    name: 'Count'
  },
  dataZoom: [
    { type: 'slider', start: 0, end: 100 },
    { type: 'inside', start: 0, end: 100 }
  ],
  series: [
    {
      name: 'Total High Priority',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: CompianceHistroyData.map(d => d.totalHighPriorityCount)
    },
    {
      name: 'Total Medium Priority',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: CompianceHistroyData.map(d => d.totalMediumPriorityCount)
    },
    {
      name: 'Total Low Priority',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: CompianceHistroyData.map(d => d.totalLowPriorityCount)
    }
  ]
};


const LineChart = () => (
  <div className="container mt-4">
    <h1>Line Chart</h1>
    <DynamicChart id="lineChart" option={lineChartOptions} height="400px" />
  </div>
);

export default LineChart;