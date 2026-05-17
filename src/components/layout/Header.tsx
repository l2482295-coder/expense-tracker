import { useUIStore } from '../../store/useUIStore';

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export default function Header() {
  const { currentYear, currentMonth, prevMonth, nextMonth } = useUIStore();

  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-xl font-bold text-[#1a3a6b]">✨ 我的记账</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-gray-700 min-w-[80px] text-center">
          {currentYear}年 {MONTHS[currentMonth - 1]}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500"
        >
          ›
        </button>
      </div>
    </header>
  );
}
