import { createContext } from "react";

interface DirectoryPathContextProps {
  directoryPath: string;
  handleDirectoryPath: (path: string) => void;
  handleBack: () => void;
}

export const DirectoryPathContext = createContext<
  DirectoryPathContextProps | undefined
>(undefined);
