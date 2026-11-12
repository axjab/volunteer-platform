interface SelectFieldProps<T extends string> {
  value: T;
  options: ReadonlyArray<T>;
  onChange: (value: T) => void;
}

export default function SelectField<T extends string>({
  value,
  options,
  onChange,
}: SelectFieldProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="rounded-2xl border border-gray-700 bg-gray-800 text-white px-4 py-3 outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-gray-800 text-white">
          {option}
        </option>
      ))}
    </select>
  );
}