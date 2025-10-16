import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import fs from "fs";
import path, { join } from "path";
import { randomUUID } from "crypto";
import { mimes } from "hono/utils/mime";
import { __dirstorage } from "@/config/config.js";

type FileType = "folder" | "document" | "image" | "video" | "audio";

const prefixMap: { [key: string]: FileType } = {
  "image/": "image",
  "video/": "video",
  "audio/": "audio",
  "text/": "document",
  "application/pdf": "document",
  "application/msword": "document",
  "application/vnd.ms-excel": "document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "document",
};

export interface FileProps {
  id: string;
  name: string;
  path: string;
  fileSize: number;
  type: FileType;
}

export const files = new Hono()
  .basePath("/files")
  .get("/", async (c) => {
    const dir = c.req.query("dir");
    const files = fs.readdirSync(join(__dirstorage, ...(dir ? [dir] : [])), {
      withFileTypes: true,
    });
    const filesMapped: Array<FileProps | null> = files.map((file) => {
      const extension = file.name.split(".").at(-1);
      if (!extension) return null;
      let docType: FileType = "document";
      Object.entries(prefixMap).forEach(([key, value]) => {
        const prefix = mimes[extension];
        if (!prefix) {
          return;
        }
        if (key.includes(mimes[extension].split("/")[0])) {
          docType = value;
        }
      });
      return {
        id: randomUUID(),
        name: file.name,
        path: join(__dirstorage, ...(dir ? [dir] : []), file.name),
        fileSize: 420,
        type: file.isDirectory() ? "folder" : docType,
      };
    });
    return c.json(filesMapped);
  })
  .get("/file", async (c) => {
    const name = c.req.query("name");
    if (!name) throw new HTTPException(400);
    const path = c.req.query("dir");
    const file = fs.readFileSync(
      join(__dirstorage, ...(path ? [path] : []), name),
    );
    const extension = name.split(".").at(-1);
    if (!extension) throw new HTTPException(400);
    const mime = mimes[extension];
    return c.body(file, 200, {
      "Content-Type": mime ?? "application/octet-stream",
      "Content-Disposition": `inline; filename="${name}"`,
    });
  })
  .delete("/", async (c) => {
    const { dir, name } = c.req.query();
    console.log({
      dir: dir,
      name: name,
    });
    const file = fs.readdirSync(join(__dirstorage, ...(dir ? [dir] : [])), {
      withFileTypes: true,
    });

    const fileToDelete = file.find((file) => name === file.name);
    if (!fileToDelete) throw new HTTPException(404);
    !!fileToDelete.isDirectory
      ? fs.rm(
          join(__dirstorage, ...(dir ? [dir] : []), fileToDelete.name),
          { recursive: true, force: true },
          (err) => {
            if (err) throw err;
            console.log("Carpeta eliminada con todo su contenido");
          },
        )
      : fs.unlinkSync(fileToDelete.parentPath);

    return c.json({ message: "File deleted successfully" });
  })
  .post("/upload/folder", async (c) => {
    const dir = c.req.query("dir");
    const body = await c.req.json();
    const folderName = body.name as string;
    const isStorageExists = fs.existsSync(__dirstorage);
    if (!isStorageExists) {
      fs.mkdirSync(__dirstorage);
    }
    const folderPath = join(__dirstorage, ...(dir ? [dir] : []), folderName);
    if (fs.existsSync(folderPath)) {
      return c.text("File already exists", 400);
    }
    fs.mkdirSync(folderPath);
    return c.json({ message: "Folder created successfully" });
  })
  .post("/upload/file", async (c) => {
    const dir = c.req.query("dir");
    const body = await c.req.parseBody();
    console.log(body);
    const isStorageExists = fs.existsSync(__dirstorage);
    if (!isStorageExists) {
      fs.mkdirSync(__dirstorage);
    }
    const chunk = body.chunk as File;
    const fileName = body.fileName as string;
    const arrayBuffer = await chunk.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    try {
      fs.writeFileSync(join(__dirstorage, `/${dir}/${fileName}`), buffer, {
        flag: "a",
      });
      console.log(`File ${fileName} uploaded successfully to ${dir}`);
    } catch (error) {
      console.error(error);
      throw new HTTPException(500, { message: "failed to upload file" });
    }

    return c.json({ message: "File uploaded successfully" });
  });
