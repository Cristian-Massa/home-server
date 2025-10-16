import { FileGrid } from "@/components/file-grid";
import { FileView } from "@/components/file-view";
import { useLocation, useSearchParams } from "react-router";

export function FileGridLayout() {
  const location = useLocation().pathname;
  const [params] = useSearchParams();
  const fileName = params.get("fileName") || "";
  return fileName ? <FileView /> : <FileGrid directoryPath={location} />;
}
