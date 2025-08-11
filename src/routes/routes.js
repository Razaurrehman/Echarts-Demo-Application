// src/routes/routes.js
import Dashboard from '../pages/Dashboard';
import AreaChart from '../pages/AreaChart';
import LineChart from '../pages/LineChart';
import SankeyDiagram from '../pages/SankeyDiagram';

const routes = [
  {
    path: '/',
    element: <Dashboard />
  }
//   {
//     path: '/linechart',
//     element: <LineChart />,
//   },
//   {
//     path: '/areachart',
//     element: <AreaChart />,
//   },
//     {
//     path: '/sankey-diagram',
//     element: <SankeyDiagram />,
//   },
];

export default routes;
