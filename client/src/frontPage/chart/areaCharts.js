import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';

const AreaChart1 = () => {
  const data = [
    {
      name: 'JAN',
      uv: 15000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'FEB',
      uv: 20000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'MAR',
      uv: 25000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'APR',
      uv: 30000,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'MAY',
      uv: 42000,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'JUN',
      uv: 45000,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'JUL',
      uv: 40000,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div style={{ padding: '10px' }}>
      <AreaChart
        width={530}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Tooltip />
        {/* <ReferenceLine x="Page C" stroke="green" label="Min PAGE" /> */}
        {/* <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" /> */}
        {/* <ReferenceLine label="Segment" stroke="green" strokeDasharray="3 3" segment={[{ x: 'Page A', y: 0 }, { x: 'Page C', y: 4000 }]} /> */}
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="red" />
      </AreaChart>
    </div>
  );
};

export default AreaChart1;
