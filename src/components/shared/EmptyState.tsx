interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
}

export default function EmptyState({
  icon = '📋',
  title = '还没有记录',
  description = '点击上方分类开始记账吧',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-5xl mb-3">{icon}</span>
      <p className="text-lg text-gray-600 font-medium mb-1">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
