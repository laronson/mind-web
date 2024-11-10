import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { client } from './db-client';

export function createContext({ req, res }: CreateFastifyContextOptions) {
    return { req, res, dbClient: client };
}
export type Context = Awaited<ReturnType<typeof createContext>>;