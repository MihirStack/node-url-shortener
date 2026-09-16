import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { urlService } from "../services/url.service";
import { URL_QUERY_KEY } from "./useUrls";

export const useCreateUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: urlService.create,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: URL_QUERY_KEY,
      });
    },
  });
};  