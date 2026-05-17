import { useState, useCallback } from 'react';

interface AmountInputProps {
  value: string;
  onChange: (val: string) => void;
  autoFocus?: boolean;
}

export default function AmountInput({ value, onChange, autoFocus = false }: AmountInputProps) {
  const [focused, setFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // 只允许数字和小数点
      const cleaned = raw.replace(/[^\d.]/g, '');
      // 确保只有一个小数点
      const parts = cleaned.split('.');
      if (parts.length > 2) return;
      // 限制小数点后两位
      if (parts.length === 2 && parts[1].length > 2) return;
      onChange(cleaned);
    },
    [onChange],
  );

  const displayValue = focused ? value : formatDisplay(value);

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400 font-light">
        ¥
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="0.00"
        autoFocus={autoFocus}
        className="w-full pl-10 pr-4 py-4 text-2xl font-semibold text-gray-800 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-brand outline-none transition placeholder:text-gray-200"
      />
    </div>
  );
}

function formatDisplay(raw: string): string {
  if (!raw) return '';
  const [int, dec] = raw.split('.');
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dec !== undefined ? `${formatted}.${dec}` : formatted;
}
