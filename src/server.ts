import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  jsonSchemaTransformObject,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import Fastify from "fastify";
import routes from "./our-first-routes.ts";
import httpErrorHandler from "./http-error-handler.ts";

const fastify = Fastify({ logger: true });

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: "SampleApi",
      description: "Sample backend service",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
  transformObject: jsonSchemaTransformObject,
});

fastify.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

const start = async () => {
  try {
    await fastify.register(httpErrorHandler);
    await fastify.register(routes);
    await fastify.listen({ port: 3333, host: "127.0.0.1" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
