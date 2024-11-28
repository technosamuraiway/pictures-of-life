import { Chart } from '../../components/chart/chart'

interface LineChartProps {
  color1: string
  color2: string
  data1: number[]
  data2: number[]
  formatYAxis?: (value: number) => string
  labels: string[]
}

export default function LineChart({
  color1,
  color2,
  data1,
  data2,
  formatYAxis,
  labels,
}: LineChartProps) {
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw // Значение данных

            return formatYAxis ? formatYAxis(value) : value // Используем форматирование, если оно передано
          },
        },
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
        // max: 3000,
        min: 0,
        ticks: {
          callback: formatYAxis || ((value: number) => value), // Форматируем ось Y, если передано
          color: '#ffffff',
          padding: 1,
          stepSize: 500,
        },
      },
    },
  }

  return <Chart data={data} options={options} type={'line'} />
}
