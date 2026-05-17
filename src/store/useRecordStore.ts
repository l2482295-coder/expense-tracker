import { create } from 'zustand';
import type { Record } from '../types';
import { readAll, writeAll } from '../utils/storage';

interface RecordState {
  records: Record[];
  _load: () => void;
  add: (record: Record) => void;
  update: (id: string, data: Partial<Record>) => void;
  remove: (id: string) => void;
  getByMonth: (year: number, month: number) => Record[];
}

export const useRecordStore = create<RecordState>((set, get) => ({
  records: [],

  _load: () => {
    const data = readAll();
    set({ records: data.records });
  },

  add: (record) => {
    const records = [...get().records, record];
    set({ records });
    const data = readAll();
    data.records = records;
    writeAll(data);
  },

  update: (id, data) => {
    const records = get().records.map((r) =>
      r.id === id ? { ...r, ...data, updatedAt: Date.now() } : r,
    );
    set({ records });
    const storeData = readAll();
    storeData.records = records;
    writeAll(storeData);
  },

  remove: (id) => {
    const records = get().records.filter((r) => r.id !== id);
    set({ records });
    const storeData = readAll();
    storeData.records = records;
    writeAll(storeData);
  },

  getByMonth: (year, month) => {
    const prefix = `${year}-${String(month).padStart(2, '0')}`;
    return get().records.filter((r) => r.date.startsWith(prefix));
  },
}));
