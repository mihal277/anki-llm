import { Skeleton } from "../ui/skeleton";

export function AnkiCardsPickerSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {Array.from(Array(9).keys()).map((i: number) => (
          <Skeleton className="rounded-lg w-64 h-64" key={i} />
        ))}
      </div>
    </div>
  );
}
