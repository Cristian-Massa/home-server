import { useDirectoryPath } from "@/components/contexts/hooks/use-directory-path";
import { usePostFolder } from "@/components/drive-sidebar/hooks/mutations/use-Post-folder";
import { Button } from "@/core/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

export const NewFolder = () => {
  const [name, setName] = useState("");
  const { directoryPath } = useDirectoryPath();
  const { createFolder, isPending } = usePostFolder(directoryPath);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-5 w-5" />
          New folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="File name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            onClick={() => createFolder(name)}
            disabled={isPending}
            className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-5 w-5" />
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
