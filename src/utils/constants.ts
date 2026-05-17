import type { Category } from '../types';

export const STORAGE_KEY = 'expense-tracker-data';

export const PRESET_CATEGORIES: Category[] = [
  { id: 'food', name: '餐饮', icon: '🍜', type: 'expense', color: '#EF4444' },
  { id: 'transport', name: '交通', icon: '🚌', type: 'expense', color: '#F59E0B' },
  { id: 'shopping', name: '购物', icon: '🛍️', type: 'expense', color: '#8B5CF6' },
  { id: 'entertainment', name: '娱乐', icon: '🎮', type: 'expense', color: '#EC4899' },
  { id: 'living', name: '生活', icon: '🏠', type: 'expense', color: '#3B82F6' },
  { id: 'expense-other', name: '其他', icon: '📦', type: 'expense', color: '#6B7280' },
  { id: 'salary', name: '工资', icon: '💰', type: 'income', color: '#10B981' },
  { id: 'parttime', name: '兼职', icon: '💼', type: 'income', color: '#14B8A6' },
  { id: 'redpacket', name: '红包', icon: '🧧', type: 'income', color: '#F43F5E' },
  { id: 'income-other', name: '其他', icon: '📥', type: 'income', color: '#6B7280' },
];
