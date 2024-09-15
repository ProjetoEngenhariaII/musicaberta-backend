import fastify from "fastify";
import { userRoutes } from "./routes/user/user.routes";
import { authRoutes } from "./routes/auth/auth.routes";
import { isAuthenticated } from "./routes/auth/isAuthenticated";

const app = fastify({
  // logger: true,
});

// app.register(authRoutes, {
//   prefix: "/auth",
// });

app.register(userRoutes, {
  prefix: "/users",
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
