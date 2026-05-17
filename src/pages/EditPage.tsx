import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecordStore } from '../store/useRecordStore';
import { PRESET_CATEGORIES } from '../utils/constants';
import AmountInput from '../components/record/AmountInput';
import CategoryPicker from '../components/record/CategoryPicker';

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const records = useRecordStore((s) => s.records);
  const update = useRecordStore((s) => s.update);

  const record = records.find((r) => r.id === id);

  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!record) return;
    setType(record.type);
    setCategoryId(record.categoryId);
    setAmount(record.amount.toString());
    setNote(record.note);
  }, [record]);

  if (!record) {
    return (
      <div className="w-full max-w-[480px] mx-auto px-4 py-6 text-center">
        <p className="text-gray-400 py-16">记录不存在</p>
        <button
          onClick={() => navigate('/')}
          className="text-brand hover:underline text-sm"
        >
          返回首页
        </button>
      </div>
    );
  }

  const categories = PRESET_CATEGORIES.filter((c) => c.type === type || c.type === 'both');

  const handleSave = () => {
    const num = parseFloat(amount);
    if (!categoryId || isNaN(num) || num <= 0) return;

    update(id!, {
      type,
      categoryId,
      amount: Math.round(num * 100) / 100,
      note: note.trim(),
    });
    navigate('/');
  };

  return (
    <div className="w-full max-w-[480px] mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600 text-lg">
          ‹
        </button>
        <h1 className="text-lg font-semibold text-[#1a3a6b]">编辑记录</h1>
      </div>

      {/* 类型切换 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setType('expense'); setCategoryId(null); }}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
            type === 'expense' ? 'bg-expense text-white' : 'bg-gray-100 text-gray-400'
          }`}
        >
          支出
        </button>
        <button
          onClick={() => { setType('income'); setCategoryId(null); }}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
            type === 'income' ? 'bg-income text-white' : 'bg-gray-100 text-gray-400'
          }`}
        >
          收入
        </button>
      </div>

      <CategoryPicker categories={categories} selected={categoryId} onSelect={setCategoryId} />

      <div className="mt-4">
        <AmountInput value={amount} onChange={setAmount} />
      </div>

      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value.slice(0, 100))}
        placeholder="添加备注..."
        className="w-full mt-3 px-4 py-3 text-sm bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-brand outline-none transition placeholder:text-gray-300"
      />

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
        >
          取消
        </button>
        <button
          onClick={handleSave}
          disabled={!categoryId || !amount || parseFloat(amount) <= 0}
          className="flex-1 py-3 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand-hover disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          保存修改
        </button>
      </div>
    </div>
  );
}
