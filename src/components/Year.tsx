"use client";

import { useEffect, useState } from "react";

// The site is a static export, so the build-time year is rendered first and corrected
// in the browser if the site hasn't been rebuilt since New Year.
const buildYear = new Date().getFullYear();

export function Year() {
  const [year, setYear] = useState(buildYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
