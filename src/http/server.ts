import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "fastify-jwt";

import { userRoutes } from "./routes/user/user.routes";
import { sheetRoutes } from "./routes/sheet/sheet.routes";
import { favoriteRoutes } from "./routes/favorite/favorite.routes";
import { requestRoutes } from "./routes/request/request.routes";

const app = fastify({
  // logger: true,
});

app.register(cors, {});

app.register(require("@fastify/multipart"), {
  limits: {
    fileSize: 5000000,
  },
});

app.register(userRoutes, {
  prefix: "/users",
});

app.register(sheetRoutes, {
  prefix: "/sheets",
});

app.register(favoriteRoutes, {
  prefix: "/favorites",
});

app.register(requestRoutes, {
  prefix: "/requests",
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
});

app.get("/", () => {
  return "Hello world!";
});

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Server listening on port 3333");
  });
