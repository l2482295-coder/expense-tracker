import { useUIStore } from '../store/useUIStore';
import { useMonthStats } from '../hooks/useMonthStats';
import Header from '../components/layout/Header';
import MonthSummary from '../components/stats/MonthSummary';
import CategoryPieChart from '../components/stats/CategoryPieChart';
import RecordForm from '../components/record/RecordForm';
import RecordList from '../components/record/RecordList';

export default function HomePage() {
  const { currentYear, currentMonth } = useUIStore();
  const stats = useMonthStats(currentYear, currentMonth);

  return (
    <div className="w-full max-w-[480px] mx-auto px-4 py-6">
      <Header />

      <MonthSummary income={stats.totalIncome} expense={stats.totalExpense} balance={stats.balance} />

      {stats.totalExpense > 0 && (
        <CategoryPieChart expenseByCategory={stats.expenseByCategory} />
      )}

      <RecordForm />

      <RecordList />
    </div>
  );
}
