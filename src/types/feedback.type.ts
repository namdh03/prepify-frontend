import { SuccessResponse } from "./response.type";

export type FeedbackType = {
  content: string;
  rating: number;
  orderDetailId: string;
};

export type CreateFeedbackBody = FeedbackType[];

export type CreateFeedbackResponse = SuccessResponse<{ index: number; id: string }[]>;
