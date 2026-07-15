"use client";

import { useState } from "react";
import { ReviewsFilters } from "./reviews-filters";
import { ReviewsList } from "./reviews-list";

export function ReviewsContainer() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <>
      <ReviewsFilters filter={filter} onFilterChange={setFilter} search={search} onSearchChange={setSearch} />
      <ReviewsList filter={filter} search={search} />
    </>
  );
}
