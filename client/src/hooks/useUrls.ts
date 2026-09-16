import { useQuery } from "@tanstack/react-query";

import { urlService } from "../services/url.service";

export const URL_QUERY_KEY = ["urls"];

export const useUrls = () => {
  return useQuery({
    queryKey: URL_QUERY_KEY,
    queryFn: urlService.getAll,
  });
};