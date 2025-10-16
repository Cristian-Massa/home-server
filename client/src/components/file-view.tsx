import { useGetFile } from "@/components/file-grid/hooks/queries/use-get-file";
import { Button } from "@/core/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const FileView = () => {
  const [params] = useSearchParams();
  const [fileName] = useState(params.get("fileName"));
  const { file, isLoading } = useGetFile(fileName);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setFileType(file.type);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (isLoading) return <p>Cargando...</p>;

  if (!file) return <p>No se ha proporcionado ningún archivo</p>;

  const isImage = fileType.startsWith("image/");
  const isVideo = fileType.startsWith("video/");
  const isAudio = fileType.startsWith("audio/");
  const isPDF = fileType === "application/pdf";
  const isText = fileType.startsWith("text/"); // txt, csv, etc.
  const isOffice =
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // docx
    fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // xlsx
    fileType === "application/msword" || // doc
    fileType === "application/vnd.ms-excel"; // xls

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      {isImage && (
        <img
          src={fileUrl}
          alt="Preview"
          className="max-w-full max-h-[80vh] object-contain"
        />
      )}

      {isVideo && (
        <video
          src={fileUrl}
          controls
          className="max-w-full max-h-[80vh] object-contain"
        />
      )}

      {isAudio && <audio src={fileUrl} controls className="w-full" />}

      {isPDF && (
        <iframe
          src={fileUrl}
          className="w-full h-[80vh] border"
          title="PDF Document"
        />
      )}

      {isText && (
        <iframe
          src={fileUrl}
          className="w-full h-[80vh] border"
          title="Texto"
        />
      )}

      {isOffice && (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            fileUrl,
          )}`}
          className="w-full h-[80vh] border"
          title="Documento Office"
        />
      )}

      {!isImage && !isVideo && !isAudio && !isPDF && !isText && !isOffice && (
        <div className="text-center">
          <p className="mb-2">Formato no soportado para previsualización</p>
          <a href={fileUrl} download={fileName || "archivo"}>
            <Button>Descargar archivo</Button>
          </a>
        </div>
      )}
    </div>
  );
};
