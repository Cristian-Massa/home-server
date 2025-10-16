import { useDirectoryPath } from "@/components/contexts/hooks/use-directory-path";

import { useQuery } from "@tanstack/react-query";

export const useGetFile = (name: string | null) => {
  const { directoryPath } = useDirectoryPath();
  console.log(directoryPath);
  const {
    data: file,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["file", name],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/api/files/file?dir=${directoryPath}&name=${name}`,
        {
          method: "GET",
        },
      );

      return await response.blob();
    },
    enabled: !!name,
  });

  return {
    file,
    isLoading,
    error,
  };
};
