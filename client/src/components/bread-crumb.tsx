import { useDirectoryPath } from "@/components/contexts/hooks/use-directory-path";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/core/components/ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

export const BreadCrumb = () => {
  const { directoryPath, handleDirectoryPath } = useDirectoryPath();
  const getDirectoryPath = () => {
    return directoryPath.split("/");
  };
  return (
    <Breadcrumb className="bg-gray-100 h-6 px-4  rounded-xl  flex items-center">
      <BreadcrumbList className="truncate">
        {getDirectoryPath().map((path, index) => (
          <Fragment key={index}>
            {path && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem onClick={() => handleDirectoryPath(path)}>
                  <BreadcrumbLink asChild>
                    <p>{path}</p>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
