import { QueryFunctionContext } from "@tanstack/react-query";

import {
  CreateFeedbackBody,
  CreateFeedbackResponse,
  FeedbackParams,
  FeedbackQueries,
  GetFeedbackByRecipeIdResponse,
} from "~types/feedback.type";
import http from "~utils/http";

export const GET_LIST_FEEDBACK_BY_RECIPE_SLUG_QUERY_KEY = "GET_LIST_FEEDBACK_BY_RECIPE_SLUG_QUERY_KEY";

export const GET_LIST_FEEDBACK_BY_RECIPE_SLUG_STALE_TIME = 1000 * 30; // 30s

export const createFeedback = (body: CreateFeedbackBody) => http.post<CreateFeedbackResponse>("/feedback", body);

export const getListFeedbackByRecipeSlug = ({
  queryKey,
}: QueryFunctionContext<[string, FeedbackParams, FeedbackQueries]>) => {
  const [, params, queries] = queryKey;
  return http.get<GetFeedbackByRecipeIdResponse>(`/feedback/${params.slug}`, { params: queries });
};
