import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import images from "~assets/imgs";
import Pagination from "~components/common/Pagination";
import Ratings from "~components/common/Ratings";
import { Button } from "~components/ui/button";
import { Progress } from "~components/ui/progress";
import { feedbackDefaultValues, feedbackSchema } from "~pages/RecipeDetail/data/schema";

export type FeedbackFormType = z.infer<typeof feedbackSchema>;

type FeedbackType = {
  id: string;
  image: string;
  fullName: string;
  rating: number;
  content: string;
  createdAt: string;
};

type RatingType = {
  rating: number;
  total: number;
};

const feedbacks: FeedbackType[] = [
  {
    id: "1",
    image: images.avatar,
    fullName: "Duong Hoang Nam",
    rating: 5,
    content:
      "I wanted to share some feedback about your cleaning service. The team was punctual and professional, which I appreciated. However, there were a few missed spots, like the living room baseboards. Please consider focusing on these details in the future. Thank you.",
    createdAt: "23/9/2023",
  },
  {
    id: "2",
    image: images.avatar,
    fullName: "Duong Hoang Nam",
    rating: 4,
    content:
      "I wanted to share some feedback about your cleaning service. The team was punctual and professional, which I appreciated. However, there were a few missed spots, like the living room baseboards. Please consider focusing on these details in the future. Thank you.",
    createdAt: "23/9/2023",
  },
  {
    id: "3",
    image: images.avatar,
    fullName: "Duong Hoang Nam",
    rating: 3,
    content:
      "I wanted to share some feedback about your cleaning service. The team was punctual and professional, which I appreciated. However, there were a few missed spots, like the living room baseboards. Please consider focusing on these details in the future. Thank you.",
    createdAt: "23/9/2023",
  },
  {
    id: "4",
    image: images.avatar,
    fullName: "Duong Hoang Nam",
    rating: 2,
    content:
      "I wanted to share some feedback about your cleaning service. The team was punctual and professional, which I appreciated. However, there were a few missed spots, like the living room baseboards. Please consider focusing on these details in the future. Thank you.",
    createdAt: "23/9/2023",
  },
  {
    id: "5",
    image: images.avatar,
    fullName: "Duong Hoang Nam",
    rating: 1,
    content:
      "I wanted to share some feedback about your cleaning service. The team was punctual and professional, which I appreciated. However, there were a few missed spots, like the living room baseboards. Please consider focusing on these details in the future. Thank you.",
    createdAt: "23/9/2023",
  },
];

const ratings: RatingType[] = [
  {
    rating: 5,
    total: 100,
  },
  {
    rating: 4,
    total: 50,
  },
  {
    rating: 3,
    total: 30,
  },
  {
    rating: 2,
    total: 20,
  },
  {
    rating: 1,
    total: 10,
  },
];

const Feedback = memo(() => {
  const [params, setParams] = useSearchParams();
  const form = useForm<FeedbackFormType>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: feedbackDefaultValues,
  });
  const ratingWatch = form.watch("rating");
  const pageWatch = form.watch("page");
  const getProgress = (total: number) => (total / ratings.reduce((acc, cur) => acc + cur.total, 0)) * 100;

  useEffect(() => {
    const rating = params.get("rating");
    const page = params.get("page");
    if (rating) form.setValue("rating", parseInt(rating));
    if (page) form.setValue("page", parseInt(page));
  }, [form, params]);

  const onSubmit = (values: FeedbackFormType) => console.log(values);

  const handleChangeRating = (rating: number) => {
    params.set("rating", rating.toString());
    form.setValue("rating", rating);
    form.handleSubmit(onSubmit)();
    setParams(params);
  };

  const handlePageChange = (page: number) => {
    params.set("page", page.toString());
    form.setValue("page", page);
    form.handleSubmit(onSubmit)();
    setParams(params);
  };

  return (
    <section className="mt-8 px-14 pt-16 pb-8 text-[#18181B] bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
      <h2 className="text-2xl font-semibold">Xếp hạng và đánh giá</h2>

      <section>
        <div className="flex justify-center items-center gap-14 mt-8">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-primary font-medium text-5xl">4.5/5</h3>
            <Ratings rating={4.5} variant="yellow" size={20} />
            <span className="text-[rgba(0,_0,_0,_0.45)] text-sm font-normal leading-6">300 Đánh giá</span>
          </div>

          <div className="flex flex-col gap-[10px]">
            {ratings.map((rating) => (
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
          {ratings.map((rating) => (
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
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="flex items-start mt-6">
            <img src={feedback.image} alt="avatar" className="w-16 h-w-16 rounded-full" />

            <div className="flex flex-col gap-[10px] ml-8 text-base font-normal leading-6">
              <h3 className="">{feedback.fullName}</h3>

              <Ratings rating={feedback.rating} variant="yellow" size={16} />

              <p>{feedback.content}</p>

              <p className="text-[rgba(0,_0,_0,_0.45)] text-sm">{feedback.createdAt}</p>
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={pageWatch} pageSize={10} totalCount={100} onPageChange={handlePageChange} />
    </section>
  );
});

export default Feedback;
