import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import cors from 'cors'

createHTTPServer({
    router: appRouter,
    middleware: cors(),
    createContext() {
        console.log('context 3');
        return {};
    },
}).listen(3003);