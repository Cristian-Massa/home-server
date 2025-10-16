import { DirectoryPathContext } from "@/components/contexts/directory-path-context";
import { useEffect, useState, type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router";

export const DirectoryPathProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [directoryPath, setDirectoryPath] = useState<string>("");

  useEffect(() => {
    setDirectoryPath(location.pathname);
  }, [location.pathname]);

  const handleDirectoryPath = (path: string) => {
    const newPath =
      directoryPath === "/" ? `/${path}` : `${directoryPath}/${path}`;
    setDirectoryPath(newPath);
    navigate(newPath);
  };
  const handleBack = () => {
    const pathArray = directoryPath.split("/");
    pathArray.pop();
    const newPath = pathArray.join("/");
    setDirectoryPath(newPath);
    navigate(newPath);
  };
  return (
    <DirectoryPathContext.Provider
      value={{ directoryPath, handleDirectoryPath, handleBack }}
    >
      {children}
    </DirectoryPathContext.Provider>
  );
};
