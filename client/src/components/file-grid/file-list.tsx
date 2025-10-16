import { useDirectoryPath } from "@/components/contexts/hooks/use-directory-path";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  Download,
  Share2,
  Trash2,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

interface FileListProps {
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

export const FileList = ({ file }: FileListProps) => {
  const Icon = getFileIcon(file.type as FileType);
  const colorClass = getFileColor(file.type as FileType);
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

  return (
    <>
      <div
        onClick={handleFileClick}
        key={file.id}
        className="group flex items-center gap-4 rounded-lg border border-transparent px-4 py-2 hover:border-border hover:bg-muted/50"
      >
        <Icon className={cn("h-5 w-5 flex-shrink-0", colorClass)} />
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {file.name}
          </p>
        </div>
        <div className="flex items-center gap-8 text-sm text-muted-foreground">
          <span className="w-20 text-right">{file.fileSize || "—"}</span>
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};
