import type { Response } from "express";

interface ApiResponseOptions<T> {
  statusCode?: number;
  message: string;
  data?: T;
}

export const sendSuccess = <T>(
  res: Response,
  {
    statusCode = 200,
    message,
    data,
  }: ApiResponseOptions<T>
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};