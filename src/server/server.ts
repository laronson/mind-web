import { appRouter, type AppRouter } from './router';
import {
    fastifyTRPCPlugin,
    FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './context';
import cors from '@fastify/cors'

const server = fastify({
    maxParamLength: 5000,
});
server.register(cors, {
    origin: "*"
})

server.register(fastifyTRPCPlugin, {
    trpcOptions: {

        router: appRouter,
        createContext,
        onError({ path, error }) {
            console.error(`Error in tRPC handler on path '${path}':`, error);
        },
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});
(async () => {
    try {
        await server.listen({ port: 3003 });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
})();