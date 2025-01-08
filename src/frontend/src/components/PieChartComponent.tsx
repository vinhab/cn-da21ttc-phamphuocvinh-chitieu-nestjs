import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';


interface DataItem {
  name: string;
  value: number;
}

interface PieChartComponentProps {
  data: DataItem[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
    const COLORS = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733', '#33FF57', '#FF33FF', '#FF6347',
        '#FFD700', '#00FF00', '#FF1493', '#C71585', '#DAA520', '#8B008B', '#6A5ACD', '#708090',
        '#40E0D0', '#0000FF', '#FF6347', '#4682B4', '#A52A2A', '#8A2BE2', '#A9A9A9', '#D2691E',
        '#8B0000', '#800080', '#E9967A', '#5F9EA0', '#BDB76B', '#F0E68C', '#90EE90', '#ADD8E6',
        '#B0C4DE', '#FF4500', '#2E8B57', '#32CD32', '#228B22', '#CD5C5C', '#F08080', '#FF00FF',
        '#D8BFD8', '#808000', '#98FB98', '#F4A460', '#FF1493', '#8B4513', '#A52A2A', '#C0C0C0',
        '#FFFF00', '#8A2BE2', '#F5DEB3', '#A9A9A9', '#D3D3D3', '#A2B5CD', '#D8BFD8', '#FF4500',
        '#FF6347', '#32CD32', '#FF8C00', '#DC143C', '#FF4500', '#7FFF00', '#6A5ACD', '#20B2AA',
        '#FF7F50', '#B8860B', '#32CD32', '#FFD700', '#DAA520', '#ADFF2F', '#FF8C00', '#F4A460',
        '#800000', '#00008B', '#FF69B4', '#0000CD', '#00FA9A', '#A52A2A'
      ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;