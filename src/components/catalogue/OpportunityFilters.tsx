import type {
  Location,
  OpportunityFiltersState,
  OpportunityFormat,
  StemCategory,
} from "../../domain/models";
import SelectField from "../ui/SelectField";

interface OpportunityFiltersProps {
  filters: OpportunityFiltersState;
  onChange: (next: OpportunityFiltersState) => void;
  categories: ReadonlyArray<StemCategory | "All">;
  formats: ReadonlyArray<OpportunityFormat | "All">;
  locations: ReadonlyArray<Location | "All">;
}

export default function OpportunityFilters({
  filters,
  onChange,
  categories,
  formats,
  locations,
}: OpportunityFiltersProps){
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <input
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        className="rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3 outline-none placeholder:text-gray-500"
        placeholder="Search by title, category, or keyword"
      />
      <SelectField value={filters.category} options={categories} onChange={(value) => onChange({ ...filters, category: value })} />
      <SelectField value={filters.format} options={formats} onChange={(value) => onChange({ ...filters, format: value })} />
      <SelectField value={filters.location} options={locations} onChange={(value) => onChange({ ...filters, location: value })} />
    </div>
  );
}