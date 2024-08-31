import fastify from "fastify";

const app = fastify({
  logger: true,
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
