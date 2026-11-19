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
}: OpportunityFiltersProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="opportunity-search"
          className="text-sm font-medium text-gray-300"
        >
          Search opportunities
        </label>
        <input
          id="opportunity-search"
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none placeholder:text-gray-500"
          placeholder="Search by title, category, or keyword"
        />
      </div>

      <SelectField
        id="opportunity-category"
        label="Category"
        value={filters.category}
        options={categories}
        onChange={(value) => onChange({ ...filters, category: value })}
      />
      <SelectField
        id="opportunity-format"
        label="Format"
        value={filters.format}
        options={formats}
        onChange={(value) => onChange({ ...filters, format: value })}
      />
      <SelectField
        id="opportunity-location"
        label="Location"
        value={filters.location}
        options={locations}
        onChange={(value) => onChange({ ...filters, location: value })}
      />
    </div>
  );
}
