interface SelectFieldProps<T extends string> {
  id: string;
  label: string;
  value: T;
  options: ReadonlyArray<T>;
  onChange: (value: T) => void;
}

export default function SelectField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: SelectFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-gray-800 text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
