"use client";

import { useEffect, useState } from "react";

/** Avoids hydration mismatch when reading persisted (localStorage) stores. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
