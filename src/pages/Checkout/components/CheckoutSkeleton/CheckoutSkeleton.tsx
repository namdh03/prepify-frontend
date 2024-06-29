import { Skeleton } from "~components/ui/skeleton";
import { TableCell, TableRow } from "~components/ui/table";

const CheckoutSkeleton = () => {
  return (
    <>
      <TableRow>
        <TableCell className="px-4 py-5">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <Skeleton className="w-20 h-20" />
              <Skeleton className="w-44 h-4" />
            </div>

            <Skeleton className="ml-auto mr-auto w-20 h-4" />
          </div>
        </TableCell>

        {[...Array(3)].map((_, index) => (
          <TableCell key={index}>
            <Skeleton className="w-20 h-4 ml-auto mr-auto" />
          </TableCell>
        ))}
      </TableRow>

      <TableRow className="text-center [&>*]:px-4 [&>*]:py-5">
        <TableCell className="text-left">
          <article className="ml-10">
            <section className="flex items-center gap-3">
              <Skeleton className="w-14 h-14" />
              <Skeleton className="w-44 h-4" />
            </section>
          </article>
        </TableCell>

        {[...Array(3)].map((_, index) => (
          <TableCell key={index}>
            <Skeleton className="w-20 h-4 ml-auto mr-auto" />
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};

export default CheckoutSkeleton;
