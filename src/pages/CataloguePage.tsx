import { useMemo, useState } from "react";
import OpportunityCard from "../components/catalogue/OpportunityCard";
import OpportunityFilters from "../components/catalogue/OpportunityFilters";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import NotificationManager from "../components/notifications/NotificationManager";
import { LOCATIONS, OPPORTUNITY_FORMATS } from "../domain/constants";
import type { OpportunityFiltersState } from "../domain/models";
import { opportunities } from "../data/mockData";
import { filterOpportunities } from "../lib/opportunities";

export default function CataloguePage() {
  const [filters, setFilters] = useState<OpportunityFiltersState>({
    search: "",
    category: "All",
    format: "All",
    location: "All",
  });

  const filtered = useMemo(() => filterOpportunities(opportunities, filters), [filters]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="STEM Youth Catalogue"
        title="Browse volunteering opportunities"
        subtitle="Find meaningful ways to contribute your STEM expertise."
      />

      <Card>
        <OpportunityFilters
          filters={filters}
          onChange={setFilters}
          categories={["All"]}
          formats={["All", ...OPPORTUNITY_FORMATS]}
          locations={["All", ...LOCATIONS]}
        />
      </Card>

      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <EmptyState message="No opportunities match your filters. Try broadening your search." />
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Get notified about new opportunities</h3>
        <NotificationManager />
      </div>
    </div>
  );
}