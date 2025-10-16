import type { File } from "@/core/interfaces/files";
import { api } from "@/core/libs/api";
import { useQuery } from "@tanstack/react-query";

export const useGetDirectories = (directoryPath: string) => {
  const {
    data: files,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["files", directoryPath],
    queryFn: async () => {
      const response = await api<File[]>({
        url: `/api/files?dir=${directoryPath}`,
        options: {
          method: "GET",
        },
      });
      return response;
    },
  });

  return { files, isLoading, error };
};
