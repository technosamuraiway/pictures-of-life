import { Chart as ReactChart } from 'react-chartjs-2'

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

// Регистрация модулей Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface ChartProps {
  data: any
  options: any
  type: 'line'
}

export function Chart({ data, options, type }: ChartProps) {
  return <ReactChart data={data} options={options} type={type} />
}
