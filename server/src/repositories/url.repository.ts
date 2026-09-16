import {
  UrlModel,
  type IUrl,
} from "../models/url.model.js";

export const createUrl = async (
  data: Pick<
    IUrl,
    "originalUrl" | "shortCode" | "expiresAt"
  >
): Promise<IUrl> => {
  return UrlModel.create(data);
};

export const findByShortCode = async (
  shortCode: string
): Promise<IUrl | null> => {
  return UrlModel.findOne({ shortCode });
};

export const findById = async (
  id: string
): Promise<IUrl | null> => {
  return UrlModel.findById(id);
};

export const findAll = async (): Promise<IUrl[]> => {
  return UrlModel.find()
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteById = async (
  id: string
): Promise<IUrl | null> => {
  return UrlModel.findByIdAndDelete(id);
};

export const incrementClickAndGet = async (
  shortCode: string
): Promise<IUrl | null> => {
  return UrlModel.findOneAndUpdate(
    {
      shortCode,
      isActive: true,
    },
    {
      $inc: {
        clickCount: 1,
      },
    },
    {
      new: true,
    }
  );
};