import Fastify from "fastify";
import routes from "./our-first-routes.ts";

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: 3333, host: "127.0.0.1" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
