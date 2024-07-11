import { memo, useCallback, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  GET_LIST_FEEDBACK_BY_RECIPE_SLUG_QUERY_KEY,
  GET_LIST_FEEDBACK_BY_RECIPE_SLUG_STALE_TIME,
  getListFeedbackByRecipeSlug,
} from "~apis/feedback.api";
import Pagination from "~components/common/Pagination";
import Ratings from "~components/common/Ratings";
import { Button } from "~components/ui/button";
import { Progress } from "~components/ui/progress";
import { Separator } from "~components/ui/separator";
import { feedbackDefaultValues, feedbackSchema } from "~pages/RecipeDetail/data/schema";
import { FeedbackParams, FeedbackQueries } from "~types/feedback.type";
import { DEFAULT_RATING, PAGE } from "~utils/constants";

import "dayjs/locale/vi";

dayjs.locale("vi");

export type FeedbackFormType = z.infer<typeof feedbackSchema>;

interface FeedbackProps {
  averageRating?: number;
  totalFeedback?: number;
}

const Feedback = memo(({ averageRating = 0, totalFeedback = 0 }: FeedbackProps) => {
  const params = useParams<FeedbackParams>();
  const [searchParams, setSearchParams] = useSearchParams();
  const queries: FeedbackQueries = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const { data: response } = useQuery({
    queryKey: [GET_LIST_FEEDBACK_BY_RECIPE_SLUG_QUERY_KEY, params, queries],
    queryFn: getListFeedbackByRecipeSlug,
    enabled: !!params.slug,
    select: (data) => data.data.data,
    staleTime: GET_LIST_FEEDBACK_BY_RECIPE_SLUG_STALE_TIME,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  const form = useForm<FeedbackFormType>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: feedbackDefaultValues,
  });
  const ratingWatch = form.watch("rating");
  const pageWatch = form.watch("page");
  const getProgress = useCallback(
    (total: number) => (total / (response?.data.ratings.reduce((acc, cur) => acc + cur.total, 0) ?? 0)) * 100,
    [response?.data.ratings],
  );

  useEffect(() => {
    const rating = searchParams.get("rating");
    const page = searchParams.get("page");

    if (rating) form.setValue("rating", parseInt(rating));
    else searchParams.set("rating", DEFAULT_RATING.toString());
    if (page) form.setValue("page", parseInt(page));
    else searchParams.set("page", PAGE.toString());

    setSearchParams(searchParams, { replace: true });
  }, [form, searchParams, setSearchParams]);

  const onSubmit = (values: FeedbackFormType) => console.log(values);

  const handleChangeRating = (rating: number) => {
    searchParams.set("rating", rating.toString());
    form.setValue("rating", rating);
    form.handleSubmit(onSubmit)();
    setSearchParams(searchParams, { replace: true });
  };

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    form.setValue("page", page);
    form.handleSubmit(onSubmit)();
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <section className="mt-8 px-14 pt-16 pb-8 text-[#18181B] bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
      <h2 className="text-2xl font-semibold">Xếp hạng và đánh giá</h2>

      <section>
        <div className="flex justify-center items-center gap-14 mt-8">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-primary font-medium text-5xl">{averageRating}/5</h3>
            <Ratings rating={averageRating} variant="yellow" size={20} />
            <span className="text-[rgba(0,_0,_0,_0.45)] text-sm font-normal leading-6">{totalFeedback} Đánh giá</span>
          </div>

          <div className="flex flex-col gap-[10px]">
            {response?.data.ratings.map((rating) => (
              <article key={rating.rating} className="flex items-center gap-2 text-base text-[#000] font-normal">
                <span className="min-w-3 text-center">{rating.rating}</span>
                <Ratings rating={1} variant="yellow" totalStars={1} />
                <Progress value={getProgress(rating.total)} className="w-96" />
                <span className="min-w-8 text-center">{rating.total}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          {response?.data.ratings.map((rating) => (
            <Button
              key={rating.rating}
              variant={ratingWatch === rating.rating ? "default" : "outline"}
              onClick={() => handleChangeRating(rating.rating)}
            >
              {rating.rating} sao
            </Button>
          ))}
        </div>
      </section>

      <div className="mt-8">
        {response && response.data.feedbacks.length > 0 ? (
          response?.data.feedbacks.map((feedback) => (
            <div key={feedback.id} className="flex items-start mt-6">
              <img src={feedback.image} alt="avatar" className="w-16 h-w-16 rounded-full" />

              <div className="flex flex-col gap-[10px] ml-8 text-base font-normal leading-6">
                <h3 className="">{feedback.fullName}</h3>

                <Ratings rating={feedback.rating} variant="yellow" size={16} />

                <p>{feedback.content}</p>

                <p className="text-[rgba(0,_0,_0,_0.45)] text-sm">{dayjs(feedback.createdAt).format("DD/MM/YYYY")}</p>

                <Separator />

                <div className="grid grid-cols-4 gap-4">
                  {feedback.images.map((image) => (
                    <img key={image} src={image} alt="feedback" className="w-28 h-28 rounded-lg object-contain" />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-32 bg-gray-100 rounded-lg mt-6">
            <p className="text-gray-500 text-lg">Không có đánh giá nào</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={pageWatch}
        pageSize={response?.pageSize ?? PAGE}
        totalCount={response?.itemTotal ?? 0}
        onPageChange={handlePageChange}
      />
    </section>
  );
});

export default Feedback;
