import api from "../api/axios";

import type {
  ApiResponse,
  CreateUrlPayload,
  ShortUrl,
} from "../types/url";

export const urlService = {
  async getAll(): Promise<ShortUrl[]> {
    const response =
      await api.get<ApiResponse<ShortUrl[]>>(
        "/urls"
      );

    return response.data.data;
  },

  async create(
    payload: CreateUrlPayload
  ): Promise<ShortUrl> {
    const response =
      await api.post<ApiResponse<ShortUrl>>(
        "/urls",
        payload
      );

    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/urls/${id}`);
  },
};