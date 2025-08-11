import DynamicChart from '../../components/DynamicChart';


const multiAxisOptions = {
  title: {
    text: null,
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['USD Revenue', 'EUR Revenue'],
    top: 0
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: [
    {
      type: 'value',
      name: 'USD',
      position: 'left',
      axisLabel: {
        formatter: '${value}'
      }
    },
    {
      type: 'value',
      name: 'EUR',
      position: 'right',
      axisLabel: {
        formatter: '€{value}'
      }
    }
  ],
  series: [
    {
      name: 'USD Revenue',
      type: 'bar',
      data: [140, 200, 0, 300, 660, 0, 440, 0, 560, 900, 900, 0],
      yAxisIndex: 0,
      itemStyle: {
        color: '#007bff'
      }
    },
    {
      name: 'EUR Revenue',
      type: 'line',
      data: [0, 0, 150, 300, 0, 100, 0, 550, 0, 900, 200, 200],
      yAxisIndex: 1,
      itemStyle: {
        color: '#05182cff'
      }
    },
    {
      name: 'EUR Revenue',
      type: 'line',
      data: [800, 950, 1100, 1050, 1150, 1250, 1000, 1200, 1350, 1400, 1500, 1600],
      yAxisIndex: 1,
      lineStyle: {
        color: '#28a745'
      },
      areaStyle: {
        color: 'rgba(40, 167, 69, 0.2)'
      }
    }
  ]
};


const BarChart = () => (
  <div className="container mt-4">
    <h1>Bar Chart</h1>
    <DynamicChart id="multiChart" option={multiAxisOptions} height="500px" />
  </div>
);

export default BarChart;