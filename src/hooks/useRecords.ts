import { useCallback } from 'react';
import { useRecordStore } from '../store/useRecordStore';
import type { ExpenseRecord } from '../types';

export function useRecords() {
  const { records, add, update, remove } = useRecordStore();

  const getByMonth = useCallback(
    (year: number, month: number) => {
      const prefix = `${year}-${String(month).padStart(2, '0')}`;
      return records.filter((r) => r.date.startsWith(prefix));
    },
    [records],
  );

  const addRecord = useCallback(
    (data: Omit<ExpenseRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = Date.now();
      const record: ExpenseRecord = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      add(record);
      return record;
    },
    [add],
  );

  return { records, addRecord, updateRecord: update, removeRecord: remove, getByMonth };
}
