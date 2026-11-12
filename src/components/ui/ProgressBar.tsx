interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  max,
  showLabel = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-400">Progress</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-3 rounded-full bg-gray-700">
        <div
          className="h-3 rounded-full bg-blue-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}