import { SuccessResponse } from "./response.type";
import { TableStateData } from "./table.type";

export type OrderDetailFeedbackType = {
  content: string;
  rating: number;
  orderDetailId: string;
};

export type CreateFeedbackBody = OrderDetailFeedbackType[];

export type CreateFeedbackResponse = SuccessResponse<{ index: number; id: string }[]>;

export type FeedbackQueries = {
  rating?: number;
  pageSize?: number;
  pageIndex?: number;
};

export type FeedbackParams = {
  slug?: string;
};

export type RecipeDetailFeedbackType = {
  id: string;
  image: string;
  fullName: string;
  rating: number;
  content: string;
  createdAt: string;
  images: string[];
};

export type RatingType = {
  rating: number;
  total: number;
};

export type GetFeedbackByRecipeIdResponse = SuccessResponse<
  {
    data: {
      feedbacks: RecipeDetailFeedbackType[];
      ratings: RatingType[];
    };
  } & Omit<TableStateData<undefined>, "data">
>;
