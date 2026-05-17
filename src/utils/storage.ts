import type { StoreData, ExpenseRecord, Category, Settings } from '../types';
import { STORAGE_KEY, PRESET_CATEGORIES } from './constants';

const CURRENT_VERSION = 1;

function defaultData(): StoreData {
  return {
    version: CURRENT_VERSION,
    records: [],
    categories: [...PRESET_CATEGORIES],
    settings: { defaultType: 'expense', firstDayOfWeek: 1 },
  };
}

const migrations: Record<number, (data: any) => StoreData> = {
  1: (data) => ({ ...defaultData(), ...data, version: 1 }),
};

function migrate(data: any): StoreData {
  let current = { ...data };
  let ver = current.version ?? 0;
  while (ver < CURRENT_VERSION) {
    ver += 1;
    current = migrations[ver](current);
  }
  return current as StoreData;
}

export function readAll(): StoreData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw);
    if (parsed.version !== CURRENT_VERSION) {
      return migrate(parsed);
    }
    return parsed as StoreData;
  } catch {
    return defaultData();
  }
}

export function writeAll(data: StoreData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getRecords(): ExpenseRecord[] {
  return readAll().records;
}

export function getCategories(): Category[] {
  return readAll().categories;
}

export function getSettings(): Settings {
  return readAll().settings;
}
