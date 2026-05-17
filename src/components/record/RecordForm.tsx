import { useState } from 'react';
import { useRecordStore } from '../../store/useRecordStore';
import { PRESET_CATEGORIES } from '../../utils/constants';
import AmountInput from './AmountInput';
import CategoryPicker from './CategoryPicker';

interface RecordFormProps {
  onSuccess?: () => void;
}

export default function RecordForm({ onSuccess }: RecordFormProps) {
  const add = useRecordStore((s) => s.add);
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const categories = PRESET_CATEGORIES.filter((c) => c.type === type || c.type === 'both');

  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (!categoryId || isNaN(num) || num <= 0) return;

    add({
      id: crypto.randomUUID(),
      type,
      amount: Math.round(num * 100) / 100,
      categoryId,
      note: note.trim(),
      date: new Date().toISOString().slice(0, 10),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    setAmount('');
    setNote('');
    onSuccess?.();
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
      {/* 类型切换 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setType('expense'); setCategoryId(null); }}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
            type === 'expense'
              ? 'bg-expense text-white'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
        >
          支出
        </button>
        <button
          onClick={() => { setType('income'); setCategoryId(null); }}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
            type === 'income'
              ? 'bg-income text-white'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
        >
          收入
        </button>
      </div>

      {/* 分类 */}
      <CategoryPicker categories={categories} selected={categoryId} onSelect={setCategoryId} />

      {/* 金额 */}
      <div className="mt-4">
        <AmountInput value={amount} onChange={setAmount} />
      </div>

      {/* 备注 */}
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value.slice(0, 100))}
        placeholder="添加备注..."
        className="w-full mt-3 px-4 py-3 text-sm bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-brand outline-none transition placeholder:text-gray-300"
      />

      {/* 提交 */}
      <button
        onClick={handleSubmit}
        disabled={!categoryId || !amount || parseFloat(amount) <= 0}
        className="w-full mt-4 py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand-hover disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        ✔ 确认记录
      </button>
    </div>
  );
}
