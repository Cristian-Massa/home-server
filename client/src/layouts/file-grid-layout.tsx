import { DirectoryPathProvider } from "@/components/contexts/provider/directory-path-provider";
import { DriveSidebar } from "@/components/drive-sidebar";
import { Outlet } from "react-router";
export const DashboardLayout = () => {
  return (
    <div className="flex h-screen flex-col bg-background">
      {/*<DriveHeader />*/}
      <div className="flex flex-1 overflow-hidden">
        <DriveSidebar />
        <DirectoryPathProvider>
          <Outlet />
        </DirectoryPathProvider>
      </div>
    </div>
  );
};
