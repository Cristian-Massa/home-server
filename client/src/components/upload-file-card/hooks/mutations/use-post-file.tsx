import { api } from "@/core/libs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router";

export const usePostFile = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation().pathname;
  const queryClient = useQueryClient();
  const { mutate: createFile, isPending } = useMutation({
    mutationFn: async (file: File) => {
      const kb = 512 * 1024;
      for (let i = 0; i < file.size; i += kb) {
        const chunk = file.slice(i, i + kb);
        const formData = new FormData();
        const props = {
          chunk: chunk,
          fileName: file.name,
        };

        for (const [key, value] of Object.entries(props)) {
          formData.append(key, value);
        }
        console.log(formData);
        await api({
          url: `/api/files/upload/file?dir=${location}`,
          options: {
            method: "POST",
            body: formData,
          },
        });
        setProgress(Math.min(((i + kb) / file.size) * 100, 100));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", location] });
    },
  });
  return { createFile, isPending, progress };
};
