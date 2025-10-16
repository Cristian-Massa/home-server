"use client";

import { useState } from "react";
import { Grid3x3, List } from "lucide-react";
import { Button } from "@/core/components/ui/button";

import { cn } from "@/core/libs/utils";
import { useGetDirectories } from "@/core/hooks/queries/use-get-directories";
import { FileCard } from "@/components/file-grid/file-card";
import { FileList } from "@/components/file-grid/file-list";
import { BreadCrumb } from "@/components/bread-crumb";
import { UploadFileCard } from "@/components/upload-file-card";

type ViewMode = "grid" | "list";

interface FileGridProps {
  directoryPath: string;
}

export function FileGrid({ directoryPath }: FileGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(
    (localStorage.getItem("view") as ViewMode) || "grid",
  );
  const { files } = useGetDirectories(directoryPath);

  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">My Drive</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-r-none",
                viewMode === "grid" && "bg-muted",
              )}
              onClick={() => {
                localStorage.setItem("view", "grid");
                setViewMode("grid");
              }}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-l-none",
                viewMode === "list" && "bg-muted",
              )}
              onClick={() => {
                localStorage.setItem("view", "list");
                setViewMode("list");
              }}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[2fr_1fr] p-2 gap-2">
        <BreadCrumb />
      </div>
      <div className="flex-1 overflow-auto p-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <UploadFileCard />
            {files &&
              files.map((file) => {
                return <FileCard key={file.id} file={file} />;
              })}
          </div>
        ) : (
          <div className="space-y-1">
            {files &&
              files.map((file) => {
                return <FileList key={file.id} file={file} />;
              })}
          </div>
        )}
      </div>
    </main>
  );
}
