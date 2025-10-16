import { useDirectoryPath } from "@/components/contexts/hooks/use-directory-path";
import { useDeleteFile } from "@/components/file-grid/hooks/mutations/use-delete-file";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import type { File } from "@/core/interfaces/files";
import { cn } from "@/core/libs/utils";
import {
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  MoreVertical,
  Trash2,
} from "lucide-react";
import type { MouseEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface FileCardProps {
  file: File;
}

type FileType = "folder" | "document" | "image" | "video" | "audio";

const getFileIcon = (type: FileType) => {
  switch (type) {
    case "folder":
      return Folder;
    case "document":
      return FileText;
    case "image":
      return ImageIcon;
    case "video":
      return Video;
    case "audio":
      return Music;
    default:
      return FileText;
  }
};

const getFileColor = (type: FileType) => {
  switch (type) {
    case "folder":
      return "text-blue-500";
    case "document":
      return "text-red-500";
    case "image":
      return "text-green-500";
    case "video":
      return "text-purple-500";
    case "audio":
      return "text-orange-500";
    default:
      return "text-muted-foreground";
  }
};

export const FileCard = ({ file }: FileCardProps) => {
  const Icon = getFileIcon(file.type as FileType);
  const colorClass = getFileColor(file.type as FileType);
  const { deleteFile } = useDeleteFile();
  const { handleDirectoryPath } = useDirectoryPath();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const handleFileClick = () => {
    if (file.type === "folder") {
      handleDirectoryPath(file.name);
    } else {
      const newParams = new URLSearchParams(params);
      newParams.set("fileName", file.name);
      navigate(`?${newParams.toString()}`);
    }
  };
  const handleDelete = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    deleteFile(file.name);
  };
  return (
    <Card
      onClick={handleFileClick}
      key={file.id}
      className="group relative flex flex-col overflow-hidden border border-border bg-card transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="flex aspect-square items-center justify-center bg-muted/50">
        <Icon className={cn("h-16 w-16", colorClass)} />
      </div>
      <div className="flex items-start gap-2 p-3">
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-card-foreground">
            {file.name}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};
