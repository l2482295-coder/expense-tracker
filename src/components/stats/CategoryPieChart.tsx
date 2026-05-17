import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PRESET_CATEGORIES } from '../../utils/constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const catColor = new Map(PRESET_CATEGORIES.map((c) => [c.id, c.color]));
const catName = new Map(PRESET_CATEGORIES.map((c) => [c.id, c.name]));

interface CategoryPieChartProps {
  expenseByCategory: Record<string, number>;
}

export default function CategoryPieChart({ expenseByCategory }: CategoryPieChartProps) {
  const { labels, dataValues, colors } = useMemo(() => {
    const entries = Object.entries(expenseByCategory).filter(([, v]) => v > 0);
    if (entries.length === 0) return { labels: [], dataValues: [], colors: [] };

    return {
      labels: entries.map(([id]) => catName.get(id) ?? id),
      dataValues: entries.map(([, v]) => v),
      colors: entries.map(([id]) => catColor.get(id) ?? '#6B7280'),
    };
  }, [expenseByCategory]);

  if (dataValues.length === 0) return null;

  const total = dataValues.reduce((a, b) => a + b, 0);

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const val = ctx.parsed;
            const pct = ((val / total) * 100).toFixed(1);
            return ` ¥${val.toFixed(2)} (${pct}%)`;
          },
        },
      },
      legend: {
        position: 'bottom' as const,
        labels: { padding: 16, usePointStyle: true, font: { size: 12 } },
      },
    },
    cutout: '55%',
  };

  return (
    <div className="mb-6">
      <Pie data={chartData} options={options} />
    </div>
  );
}
