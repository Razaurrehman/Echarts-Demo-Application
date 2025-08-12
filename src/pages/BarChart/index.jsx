import DynamicChart from '../../components/DynamicChart';


const multiAxisOptions = {
  title: {
    text: null,
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  legend: {
    data: ['USD Revenue A', 'USD Revenue B', 'EUR Revenue A', 'EUR Revenue B', 'EUR Trend'],
    top: 0
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: [
    {
      type: 'value',
      name: 'Revenue (USD/EUR)',
      position: 'left',
      axisLabel: {
        formatter: value => `$${value}`
      }
    },
    {
      type: 'value',
      name: 'EUR Trend',
      position: 'right',
      axisLabel: {
        formatter: value => `€${value}`
      }
    }
  ],
  series: [
    // USD STACK
    {
      name: 'USD Revenue A',
      type: 'bar',
      stack: 'USD',
      data: [140, 200, 0, 300, 660, 0, 440, 0, 560, 900, 900, 0],
      yAxisIndex: 0,
      itemStyle: {
        color: '#1684c2',
        borderColor: '#ffff', // border color
        borderWidth: 1,
        borderRadius: 5
      }
    },
    {
      name: 'USD Revenue B',
      type: 'bar',
      stack: 'USD',
      data: [100, 110, 0, 300, 660, 0, 40, 0, 60, 600, 200, 100],
      yAxisIndex: 0,
      itemStyle: {
        color: '#16c645',
        borderColor: '#ffff',
        borderWidth: 1,
        borderRadius: 5
      }
    },

    // EUR STACK
    {
      name: 'EUR Revenue A',
      type: 'bar',
      stack: 'EUR',
      data: [0, 0, 150, 300, 0, 100, 0, 550, 0, 900, 200, 200],
      yAxisIndex: 0,
      itemStyle: {
        color: '#e69419',
        borderColor: '#ffff',
        borderWidth: 1,
        borderRadius: 5
      }
    },
    {
      name: 'EUR Revenue B',
      type: 'bar',
      stack: 'EUR',
      data: [800, 950, 1100, 1050, 1150, 1250, 1000, 1200, 1350, 1400, 1500, 1600],
      yAxisIndex: 0,
      itemStyle: {
        color: '#16c645',
        borderColor: '#ffff',
        borderWidth: 1,
        borderRadius: 5
      }
    },

    // EUR LINE TREND
    {
      name: 'EUR Trend',
      type: 'line',
      data: [900, 950, 1250, 1350, 1150, 1350, 1000, 1500, 1350, 1600, 1700, 1800],
      yAxisIndex: 1,
      symbol: 'none',
      lineStyle: {
        color: '#ff4d4f',
        width: 2
      }
    },

    {
      name: 'Revenue USD Trend',
      type: 'line',
      data: [90, 450, 250, 350, 150, 330, 800, 580, 360, 600, 700,800],
      yAxisIndex: 1,
      symbol: 'none',
      lineStyle: {
        color: '#1684c2',
        width: 2
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