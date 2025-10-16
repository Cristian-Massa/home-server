import { usePostFile } from "@/components/upload-file-card/hooks/mutations/use-post-file";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { Progress } from "@/core/components/ui/progress";
import { Cloud } from "lucide-react";
import { useRef } from "react";

export const UploadFileCard = () => {
  const uploadFileRef = useRef<HTMLInputElement | null>(null);
  const { createFile, isPending, progress } = usePostFile();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const file = uploadFileRef.current?.files?.[0];
    if (!file) return;
    createFile(file);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer group relative flex flex-col overflow-hidden border border-border bg-card transition-all hover:border-primary/50 hover:shadow-md">
          <div className="flex aspect-square items-center justify-center bg-muted/50">
            <Cloud className="text-blue-500" size={80} />
          </div>
          <div className="flex items-start gap-2 p-3">
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-card-foreground">
                Upload a file
              </p>
            </div>
            <div className="flex items-center gap-1"></div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input type="file" ref={uploadFileRef} />
          <Progress value={progress} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
