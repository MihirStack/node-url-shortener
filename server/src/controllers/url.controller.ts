import type {
  Request,
  Response,
} from "express";

import * as urlService from "../services/url.service.js";
import { AppError } from "../utils/AppError.js";
import { sendSuccess } from "../utils/response.js";

export const createUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    originalUrl,
    expiresAt,
  } = req.body;

  const url = await urlService.createShortUrl(
    originalUrl,
    expiresAt
  );

  sendSuccess(res, {
    statusCode: 201,
    message: "Short URL created successfully",
    data: url,
  });
};

export const getUrls = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const urls = await urlService.getAllUrls();

  sendSuccess(res, {
    message: "URLs retrieved successfully",
    data: urls,
  });
};

export const getUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new AppError("URL id is required", 400);
  }

  const url = await urlService.getUrlById(
    id
  );

  sendSuccess(res, {
    message: "URL retrieved successfully",
    data: url,
  });
};

export const removeUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new AppError("URL id is required", 400);
  }

  await urlService.deleteUrl(id);

  sendSuccess(res, {
    message: "URL deleted successfully",
  });
};

export const redirectUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { shortCode } = req.params;

  if (typeof shortCode !== "string") {
    throw new AppError("Short code is required", 400);
  }

  const originalUrl =
    await urlService.resolveShortUrl(
      shortCode
    );

  res.redirect(302, originalUrl);
};