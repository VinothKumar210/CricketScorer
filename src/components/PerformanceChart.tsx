'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MatchPerformance {
  id: string;
  opponent: string;
  date: string;
  runs: number;
  wickets: number;
  result: string;
}

interface PerformanceChartProps {
  matches: MatchPerformance[];
}

export default function PerformanceChart({ matches }: PerformanceChartProps) {
  // Format data for the chart
  const chartData = matches.map(match => ({
    match: `vs ${match.opponent.split(' ').pop()}`,
    runs: match.runs,
    wickets: match.wickets,
    result: match.result.startsWith('Won') ? 'W' : 'L'
  }));

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Trends</h3>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="match" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
              <Tooltip 
                formatter={(value, name) => [value, name === 'runs' ? 'Runs' : 'Wickets']}
                labelFormatter={(label) => `Match: ${label}`}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="runs"
                name="Runs"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="wickets"
                name="Wickets"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          <span className="inline-flex items-center mr-4">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span> Runs
          </span>
          <span className="inline-flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span> Wickets
          </span>
        </div>
      </div>
    </div>
  );
}
