import DynamicChart from '../../components/DynamicChart';

const areaChartOptions = {
  title: {
    text: 'Monthly Signups (Area Chart)',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Signups',
      type: 'line',
      data: [150, 230, 224, 218, 135, 147],
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        color: '#28a745'
      },
      areaStyle: {
        color: 'rgba(40,167,69,0.3)' // green with transparency
      }
    }
  ]
};

const AreaChart = () => (
 <div className="container mt-4">
    <h1>Area Chart</h1>
    <DynamicChart id="areaChart" option={areaChartOptions} height="400px" />
  </div>
);

export default AreaChart;
