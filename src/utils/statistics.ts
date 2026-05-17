import type { Record } from '../types';

export interface MonthStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  expenseByCategory: Record<string, number>;
}

export function calcMonthStats(records: Record[], year: number, month: number): MonthStats {
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const monthRecords = records.filter((r) => r.date.startsWith(prefix));

  let totalIncome = 0;
  let totalExpense = 0;
  const expenseByCategory: Record<string, number> = {};

  for (const r of monthRecords) {
    if (r.type === 'income') {
      totalIncome += r.amount;
    } else {
      totalExpense += r.amount;
      expenseByCategory[r.categoryId] = (expenseByCategory[r.categoryId] || 0) + r.amount;
    }
  }

  return {
    totalIncome: Math.round(totalIncome * 100) / 100,
    totalExpense: Math.round(totalExpense * 100) / 100,
    balance: Math.round((totalIncome - totalExpense) * 100) / 100,
    expenseByCategory,
  };
}

export function getMonthKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`;
}
