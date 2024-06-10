export function findSidebarMinMax(ranges: (string | number)[]): { min: number; max: number } {
  return ranges.reduce(
    (acc, range) => ({
      min: Math.min(
        acc.min,
        typeof range === "number" || /^\d+$/.test(range)
          ? Number(range)
          : range === "below-100000"
            ? 0
            : range === "above-500000"
              ? 500000
              : Number(range.split("-")[0]),
      ),
      max: Math.max(
        acc.max,
        typeof range === "number" || /^\d+$/.test(range)
          ? Number(range)
          : range === "below-100000"
            ? 100000
            : range === "above-500000"
              ? 10000000
              : Number(range.split("-")[1]),
      ),
    }),
    { min: Infinity, max: -Infinity },
  );
}
