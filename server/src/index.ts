import { files } from "@/routes/file.js";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono().basePath("");
app.use(
  "/api/*",
  cors({
    origin: "*",
  }),
);
const api = app.basePath("/api");
api.route("/", files);
serve(
  {
    fetch: app.fetch,
    port: 8080,
    hostname: "0.0.0.0",
  },
  (info) => {
    console.log(`Server is running on http://0.0.0.0:${info.port}`);
  },
);
