import type { Category } from '../../types';

interface CategoryPickerProps {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function CategoryPicker({ categories, selected, onSelect }: CategoryPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {categories.map((cat) => {
        const isSelected = cat.id === selected;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all ${
              isSelected
                ? 'bg-brand text-white shadow-md scale-105'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-xs font-medium">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
