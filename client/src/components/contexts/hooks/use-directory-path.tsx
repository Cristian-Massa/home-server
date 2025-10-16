import { DirectoryPathContext } from "@/components/contexts/directory-path-context";
import { useContext } from "react";

export const useDirectoryPath = () => {
  const context = useContext(DirectoryPathContext);
  if (!context) {
    throw new Error(
      "useDirectoryPath must be used within a DirectoryPathProvider",
    );
  }
  return context;
};
