import { nanoid } from "nanoid";

import { env } from "../config/env.js";
import * as urlRepository from "../repositories/url.repository.js";
import { AppError } from "../utils/AppError.js";

import type { IUrl } from "../models/url.model.js";

const SHORT_CODE_LENGTH = 7;
const MAX_GENERATION_ATTEMPTS = 5;

const isDuplicateKeyError = (
  error: unknown
): error is { code: number } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  );
};

const buildShortUrl = (shortCode: string): string => {
  return `${env.BACKEND_URL}/${shortCode}`;
};

const serializeUrl = (url: IUrl) => ({
  id: url._id.toString(),
  originalUrl: url.originalUrl,
  shortCode: url.shortCode,
  shortUrl: buildShortUrl(url.shortCode),
  clickCount: url.clickCount,
  expiresAt: url.expiresAt,
  isActive: url.isActive,
  createdAt: url.createdAt,
  updatedAt: url.updatedAt,
});

export const createShortUrl = async (
  originalUrl: string,
  expiresAt?: string | null
) => {
  for (
    let attempt = 1;
    attempt <= MAX_GENERATION_ATTEMPTS;
    attempt++
  ) {
    const shortCode = nanoid(SHORT_CODE_LENGTH);

    try {
      const url = await urlRepository.createUrl({
        originalUrl,
        shortCode,
        expiresAt: expiresAt
          ? new Date(expiresAt)
          : null,
      });

      return serializeUrl(url);
    } catch (error) {
      if (
        isDuplicateKeyError(error) &&
        attempt < MAX_GENERATION_ATTEMPTS
      ) {
        continue;
      }

      throw error;
    }
  }

  throw new AppError(
    "Unable to generate a unique short URL",
    500
  );
};

export const getAllUrls = async () => {
  const urls = await urlRepository.findAll();

  return urls.map(serializeUrl);
};

export const getUrlById = async (id: string) => {
  const url = await urlRepository.findById(id);

  if (!url) {
    throw new AppError("URL not found", 404);
  }

  return serializeUrl(url);
};

export const deleteUrl = async (id: string) => {
  const url = await urlRepository.deleteById(id);

  if (!url) {
    throw new AppError("URL not found", 404);
  }
};

export const resolveShortUrl = async (
  shortCode: string
): Promise<string> => {
  const url = await urlRepository.findByShortCode(shortCode);

  if (!url) {
    throw new AppError("Short URL not found", 404);
  }

  if (!url.isActive) {
    throw new AppError(
      "This short URL is no longer active",
      410
    );
  }

  if (
    url.expiresAt &&
    url.expiresAt.getTime() <= Date.now()
  ) {
    throw new AppError(
      "This short URL has expired",
      410
    );
  }

  await urlRepository.incrementClickAndGet(shortCode);

  return url.originalUrl;
};