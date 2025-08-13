import DynamicChart from '../../components/DynamicChart';
import CompianceHistroyData from "../../Constants/complianceHistroyData.json"; // path to your file


// Prepare data
const categories = CompianceHistroyData.map(item => {
  const date = new Date(item.date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  return `${day} ${month}`;
});

const lowPriorityData = CompianceHistroyData.map(d => d.lowFailed);
const mediumPriorityData = CompianceHistroyData.map(d => d.mediumFailed);
const highPriorityData = CompianceHistroyData.map(d => d.highFailed);
const complianceScoreData = CompianceHistroyData.map(d => d.score.toFixed(2));

const chartOptions = {
  title: {
    text: null,
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  legend: {
    top: 0,
    data: ['High Priority', 'Medium Priority', 'Low Priority', 'Compliance Score']
  },
  xAxis: {
    type: 'category',
    data: categories,
    axisLine: {
    show: true,
    lineStyle: {
      color: '#333', // axis line color
      width: 2       // axis line thickness
      }
    },
    splitLine: {
      show: true, // enable horizontal grid lines
      lineStyle: {
        color: '#ddd',
        type: 'dashed'
      }
    }
  },
  yAxis: [
  {
    type: 'value',
    name: 'No. of Failed Rules', // ✅ left side for bars
    nameLocation: 'middle', // ✅ vertical center
    nameGap: 40, // adjust spacing from axis
    position: 'left',
    nameTextStyle: {
      fontSize: 16
    },
    axisLine: {
    show: true,
    lineStyle: {
      color: '#333', // axis line color
      width: 2       // axis line thickness
      }
    },
    splitLine: {
      show: true, // enable horizontal grid lines
      lineStyle: {
        color: '#ddd',
        type: 'dashed'
      }
    }
  },
  {
    type: 'value',
    name: 'Compliance Score', // ✅ right side for line
    position: 'right',
    nameLocation: 'middle', // ✅ vertical center
    nameGap: 40, // adjust spacing from axis
    min: 0,
    max: 100,
    nameTextStyle: {
      fontSize: 16
    }
  }
],
  dataZoom: [
    { type: 'slider', start: 0, end: 100 },
    { type: 'inside', start: 0, end: 100 }
  ],
  series: [
    {
      name: 'High Priority',
      type: 'bar',
      data: highPriorityData,
      itemStyle: { color: '#b01323' }
    },
    {
      name: 'Medium Priority',
      type: 'bar',
      data: mediumPriorityData,
      itemStyle: { color: '#e99734' }
    },
    {
      name: 'Low Priority',
      type: 'bar',
      data: lowPriorityData,
      itemStyle: { color: '#bead4e' }
    },
    {
      name: 'Compliance Score',
      type: 'line',
      yAxisIndex: 1,
      data: complianceScoreData,
      smooth: true,
      symbol: "none",
      lineStyle: {
        color: '#666666',
        width: 3
      },
      itemStyle: {
        color: '#666666'
      }
    }
  ]
};



const LineChart = () => (
  <div className="container-fuild mt-4">
    <h1 className='text-center mb-10'>Line Chart(Mock Data)</h1>
    <DynamicChart id="lineChart" option={chartOptions} height="700px" />
  </div>
);

export default LineChart;