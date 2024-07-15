import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~components/ui/pagination";
import usePagination, { DOTS } from "~hooks/usePagination";
import { cn } from "~lib/utils";

export interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

const Pagination = ({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const lastPage = paginationRange[paginationRange.length - 1];

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) return;

  const onPrevious = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  const onNext = () => {
    if (currentPage === lastPage) return;
    onPageChange(currentPage + 1);
  };

  return (
    <PaginationShadcn className={cn("mt-10", className)}>
      <PaginationContent>
        <PaginationItem onClick={onPrevious}>
          <PaginationPrevious className={cn({ "opacity-80 cursor-auto hover:bg-transparent": currentPage === 1 })} />
        </PaginationItem>

        {paginationRange.map((pageNumber, index) => {
          const key = `pagination-${index}`;
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <PaginationEllipsis key={key} />;
          }

          // Render our Page Pills
          return (
            <PaginationItem key={key}>
              <PaginationLink isActive={pageNumber === currentPage} onClick={() => onPageChange(pageNumber as number)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem onClick={onNext}>
          <PaginationNext
            className={cn({
              "opacity-80 cursor-auto hover:bg-transparent": currentPage === lastPage,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShadcn>
  );
};

export default Pagination;
