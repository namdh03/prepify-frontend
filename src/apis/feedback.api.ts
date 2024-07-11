import { CreateFeedbackBody, CreateFeedbackResponse } from "~types/feedback.type";
import http from "~utils/http";

export const createFeedback = (body: CreateFeedbackBody) => http.post<CreateFeedbackResponse>("/feedback", body);
