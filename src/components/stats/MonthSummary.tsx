import { formatAmount } from '../../utils/format';

interface MonthSummaryProps {
  income: number;
  expense: number;
  balance: number;
}

export default function MonthSummary({ income, expense, balance }: MonthSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-income/5 rounded-2xl p-4 text-center">
        <p className="text-xs text-gray-400 mb-1">收入</p>
        <p className="text-lg font-bold text-income">¥{formatAmount(income)}</p>
      </div>
      <div className="bg-expense/5 rounded-2xl p-4 text-center">
        <p className="text-xs text-gray-400 mb-1">支出</p>
        <p className="text-lg font-bold text-expense">¥{formatAmount(expense)}</p>
      </div>
      <div className="bg-brand/5 rounded-2xl p-4 text-center">
        <p className="text-xs text-gray-400 mb-1">结余</p>
        <p className={`text-lg font-bold ${balance >= 0 ? 'text-income' : 'text-expense'}`}>
          {balance >= 0 ? '+' : '-'}¥{formatAmount(Math.abs(balance))}
        </p>
      </div>
    </div>
  );
}
