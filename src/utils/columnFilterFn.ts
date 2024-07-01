import { TableRequestState } from "~types/table.type";

export default function columnFilterFn<T>({ columnFilters }: Pick<TableRequestState, "columnFilters">) {
  const filters = columnFilters.reduce(
    (acc, { id, value }) => {
      if (typeof value === "string" || Array.isArray(value)) {
        acc[id] = Array.isArray(value) ? value.join(",") : value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return filters as T;
}
