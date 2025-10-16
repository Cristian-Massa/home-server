import { api } from "@/core/libs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useLocation } from "react-router";

export const useDeleteFile = () => {
  const location = useLocation().pathname;
  const queryClient = useQueryClient();
  const { mutate: deleteFile, isPending } = useMutation({
    mutationFn: async (fileName: string) => {
      console.log(location, fileName);
      await api({
        url: `/api/files?dir=${location}&name=${fileName}`,
        options: {
          method: "DELETE",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", location] });
    },
  });
  return { deleteFile, isPending };
};
