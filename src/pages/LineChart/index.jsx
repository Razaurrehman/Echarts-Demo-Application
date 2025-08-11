import DynamicChart from '../../components/DynamicChart';


const lineChartOptions = {
  title: {
    text: 'Monthly Revenue',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Revenue',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330],
      smooth: true,
      lineStyle: {
        color: '#007bff'
      },
      areaStyle: {
        color: 'rgba(0,123,255,0.2)'
      }
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