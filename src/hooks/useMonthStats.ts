import { useMemo } from 'react';
import { useRecordStore } from '../store/useRecordStore';
import { calcMonthStats, type MonthStats } from '../utils/statistics';

export function useMonthStats(year: number, month: number): MonthStats {
  const records = useRecordStore((s) => s.records);
  return useMemo(() => calcMonthStats(records, year, month), [records, year, month]);
}
