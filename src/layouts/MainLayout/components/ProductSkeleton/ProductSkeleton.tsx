import { FiBarChart } from "react-icons/fi";
import { LuClock2 } from "react-icons/lu";

import Ratings from "~components/common/Ratings";
import { Skeleton } from "~components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <article className="relative flex flex-col gap-2 pt-24 px-9 pb-5 bg-white rounded-[34px] text-center [box-shadow:0px_9px_27px_0px_rgba(0,_0,_0,_0.07)]">
      <Skeleton className="absolute -top-[90px] left-1/2 -translate-x-1/2 w-[179px] h-[179px] rounded-full overflow-hidden" />
      <Skeleton className="h-4 rounded" />
      <Skeleton className="min-w-24 h-4 mx-auto rounded" />

      <div className="flex justify-center gap-3">
        <div className="flex items-center gap-[2px]">
          <FiBarChart size={14} className="text-primary" />
          <Skeleton className="min-w-10 h-4 rounded" />
        </div>

        <div className="flex items-center gap-[2px]">
          <LuClock2 size={14} className="text-primary" />
          <Skeleton className="min-w-10 h-4 rounded" />
        </div>
      </div>

      <Skeleton className="min-w-36 mx-auto h-4 rounded" />

      <div className="flex justify-center gap-6">
        <Ratings rating={5} size={14} variant="yellow" />
        <Skeleton className="min-w-20 h-4 rounded" />
      </div>
    </article>
  );
};

export default ProductSkeleton;
