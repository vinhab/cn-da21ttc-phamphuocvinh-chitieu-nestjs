import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartProps {
  data: { month: string; income: number; expense: number }[];
}

const ComparisonChartComponent: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#00b300" name="Income" strokeWidth={2} /> {/* Xanh lá cây */}
        <Line type="monotone" dataKey="expense" stroke="#ff0000" name="Expense" strokeWidth={2} /> {/* Đỏ */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ComparisonChartComponent;
