import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { urlService } from "../services/url.service";
import { URL_QUERY_KEY } from "./useUrls";

export const useDeleteUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: urlService.delete,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: URL_QUERY_KEY,
      });
    },
  });
};