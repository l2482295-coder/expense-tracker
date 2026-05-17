import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecordStore } from '../../store/useRecordStore';
import { useUIStore } from '../../store/useUIStore';
import { PRESET_CATEGORIES } from '../../utils/constants';
import { formatAmount, formatTime } from '../../utils/format';
import EmptyState from '../shared/EmptyState';
import ConfirmDialog from '../shared/ConfirmDialog';

const categoryMap = new Map(PRESET_CATEGORIES.map((c) => [c.id, c]));

export default function RecordList() {
  const navigate = useNavigate();
  const { currentYear, currentMonth } = useUIStore();
  const records = useRecordStore((s) => s.records);
  const remove = useRecordStore((s) => s.remove);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const monthRecords = useMemo(() => {
    const prefix = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
    return records
      .filter((r) => r.date.startsWith(prefix))
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [records, currentYear, currentMonth]);

  // 按日期分组
  const groups = useMemo(() => {
    const map = new Map<string, typeof monthRecords>();
    for (const r of monthRecords) {
      const list = map.get(r.date) ?? [];
      list.push(r);
      map.set(r.date, list);
    }
    return Array.from(map.entries());
  }, [monthRecords]);

  if (monthRecords.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="space-y-4">
        {groups.map(([date, items]) => (
          <div key={date}>
            <p className="text-xs text-gray-400 font-medium mb-2 px-1">
              {date === new Date().toISOString().slice(0, 10) ? '今天' : date}
            </p>
            <div className="space-y-1">
              {items.map((r) => {
                const cat = categoryMap.get(r.categoryId);
                return (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition cursor-pointer group"
                    onClick={() => navigate(`/edit/${r.id}`)}
                  >
                    <span className="text-xl">{cat?.icon ?? '📄'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {cat?.name ?? '未知'} {r.note && `· ${r.note}`}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatTime(r.createdAt)}</p>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        r.type === 'expense' ? 'text-expense' : 'text-income'
                      }`}
                    >
                      {r.type === 'expense' ? '-' : '+'}¥{formatAmount(r.amount)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(r.id);
                      }}
                      className="text-gray-300 hover:text-expense opacity-0 group-hover:opacity-100 transition text-lg leading-none"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="删除记录"
        message="确定要删除这条记录吗？"
        onConfirm={() => {
          if (deleteTarget) remove(deleteTarget);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
