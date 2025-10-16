import { api } from "@/core/libs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";

export const usePostFolder = (dir: string) => {
  const queryClient = useQueryClient();

  const location = useLocation().pathname;
  const { mutate: createFolder, isPending } = useMutation({
    mutationFn: async (name: string) => {
      if (!name.length) return;
      await api({
        url: `/api/files/upload/folder?dir=${dir}`,
        options: {
          method: "POST",
          body: JSON.stringify({ name }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["files", location],
      });
    },
  });
  return {
    createFolder,
    isPending,
  };
};
