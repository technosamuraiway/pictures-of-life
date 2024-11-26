import { Chart } from '../../components/chart/chart'

interface LineChartProps {
  color1: string
  color2: string
  data1: number[]
  data2: number[]
  labels: string[]
}

export default function LineChart({ color1, color2, data1, data2, labels }: LineChartProps) {
  const data = {
    datasets: [
      {
        backgroundColor: `${color1}20`,
        borderColor: color1,
        borderWidth: 2,
        data: data1,
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        backgroundColor: `${color2}20`,
        borderColor: color2,
        borderWidth: 2,
        data: data2,
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
    labels,
  }

  const options = {
    maintainAspectRatio: false, // Игнорировать соотношение сторон
    plugins: {
      legend: {
        display: false, // Убираем легенду из графика
      },
    },
    responsive: true,

    scales: {
      x: {
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        beginAtZero: true,
        min: 0, // Минимальное значение оси Y
        ticks: {
          color: '#ffffff',
          padding: 1, // Расстояние между метками
          stepSize: 500, // Шаг между метками
        },
      },
    },
  }

  return <Chart data={data} options={options} type={'line'} />
}
