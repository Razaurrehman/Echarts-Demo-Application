import DynamicChart from '../../components/DynamicChart';


// Generate 50 mock timestamps, 1-day apart
const startTime = Date.now(); // current time
const mockDates = Array.from({ length: 50 }, (_, i) => startTime + i * 24 * 60 * 60 * 1000); 

const multiAxisOptions = {
  title: {
    text: null,
    left: 'center'
  },
  tooltip: {
  trigger: 'axis',
  axisPointer: { type: 'shadow' },
  formatter: function (params) {
    const date = new Date(Number(params[0].axisValue));
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric' // optional, remove if you don’t want year
    });

        let tooltipContent = `<b>${formattedDate}</b><br/>`;
        params.forEach(p => {
          tooltipContent += `
            <span style="display:inline-block;margin-right:5px;
              border-radius:10px;width:9px;height:9px;
              background-color:${p.color}"></span>
            ${p.seriesName}: ${p.value}
            <br/>
          `;
        });
        return tooltipContent;
      }
    },
  legend: {
    data: [
      'USD Revenue A',
      'USD Revenue B',
      'EUR Revenue A',
      'EUR Revenue B',
      'EUR Trend',
      'Revenue USD Trend'
    ],
    top: 0
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 20
    },
    {
      type: 'inside',
      xAxisIndex: [0]
    }
  ],
  xAxis: {
    type: 'category',
    data: mockDates, // timestamps in ms
    axisLabel: {
      formatter: function (value) {
        const date = new Date(Number(value));
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short'
        }); // dd-MMM
      }
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
  yAxis: [
    {
      type: 'value',
      name: 'Revenue (USD/EUR)',
      position: 'left',
      axisLabel: {
        formatter: value => `$${value}`
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
      name: 'EUR/USD Trend',
      position: 'right',
      axisLabel: {
        formatter: value => `${value}`
      }
    }
  ],
  series: [
    {
      name: 'USD Revenue A',
      type: 'bar',
      stack: 'USD',
      data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000)),
      yAxisIndex: 0,
      itemStyle: {
        color: '#1684c2',
        borderColor: '#ffff',
        borderWidth: 1,
        borderRadius: 5
      }
    },
    {
      name: 'USD Revenue B',
      type: 'bar',
      stack: 'USD',
      data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000)),
      yAxisIndex: 0,
      itemStyle: {
        color: '#16c645',
        borderColor: '#ffff',
        borderWidth: 1,
        borderRadius: 5
      }
    },
    {
      name: 'EUR Revenue A',
      type: 'bar',
      stack: 'EUR',
      data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000)),
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
      data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000)),
      yAxisIndex: 0,
      itemStyle: {
        color: '#16c645',
        borderColor: '#ffff',
        borderWidth: 1,
        borderRadius: 5
      }
    },
    {
      name: 'EUR Trend',
      type: 'line',
      data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 2000)),
      yAxisIndex: 1,
      symbol: 'none',
      lineStyle: {
        color: '#ff4d4f',
        width: 3
      }
    },
    {
      name: 'Revenue USD Trend',
      type: 'line',
      data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 2000)),
      yAxisIndex: 1,
      symbol: 'none',
      lineStyle: {
        color: '#1684c2',
        width: 3
      }
    }
  ]
};




const BarChart = () => (
  <div className="container-fuild mt-4">
    <h1 className='text-center mb-10'>Bar Chart(Mock Data)</h1>
    <DynamicChart id="multiChart" option={multiAxisOptions} height="700px" />
  </div>
);

export default BarChart;