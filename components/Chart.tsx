// components/Chart.tsx
"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function Chart({ data }: { data: [number, number][] }) {
  const chartData = {
    labels: data.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: data.map(([, price]) => price),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    ],
  };

  return (
    <div className="max-w-4xl">
      <Line data={chartData} />
    </div>
  );
}
