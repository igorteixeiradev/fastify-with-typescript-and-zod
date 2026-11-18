import { z } from "zod/v4";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

const routes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: z
            .object({ hello: z.string() })
            .describe("Health check / hello world"),
        },
      },
    },
    async () => ({ hello: "world" }),
  );
};

export default routes;
