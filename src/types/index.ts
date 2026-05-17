export interface Record {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  categoryId: string;
  note: string;
  date: string;
  createdAt: number;
  updatedAt: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: 'expense' | 'income' | 'both';
  color: string;
}

export interface Settings {
  defaultType: 'expense' | 'income';
  firstDayOfWeek: 0 | 1;
}

export interface StoreData {
  version: number;
  records: Record[];
  categories: Category[];
  settings: Settings;
}
