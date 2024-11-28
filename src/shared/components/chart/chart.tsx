'use client'

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
import dynamic from 'next/dynamic'

// Регистрация модулей Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Динамическая загрузка Chart.js
const DynamicChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Chart), { ssr: false })

interface ChartProps {
  data: any
  options: any
  type: 'line'
}

export function Chart({ data, options, type }: ChartProps) {
  return <DynamicChart data={data} options={options} type={type} />
}
