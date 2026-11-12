import type { Opportunity, OpportunityFiltersState } from "../domain/models";

export function filterOpportunities(
  opportunities: Opportunity[],
  filters: OpportunityFiltersState
): Opportunity[] {
  return opportunities.filter((opp) => {
    const query = filters.search.trim().toLowerCase();

    const matchesSearch =
      query.length === 0 ||
      opp.title.toLowerCase().includes(query) ||
      opp.description.toLowerCase().includes(query) ||
      opp.category.toLowerCase().includes(query);

    const matchesCategory =
      filters.category === "All" || opp.category === filters.category;

    const matchesFormat = filters.format === "All" || opp.format === filters.format;

    const matchesLocation =
      filters.location === "All" || opp.location === filters.location;

    return matchesSearch && matchesCategory && matchesFormat && matchesLocation;
  });
}

export function getFeaturedOpportunities(opportunities: Opportunity[], limit = 3): Opportunity[] {
  return opportunities.filter((opp) => opp.featured).slice(0, limit);
}