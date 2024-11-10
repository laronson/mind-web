import { publicProcedures, router } from './trpc'
import { z } from 'zod';


const note = z.object({ title: z.string(), body: z.string() })
type Note = z.infer<typeof note>

const notes: Note[] = []

export const appRouter = router({
    getNotes: publicProcedures.query(async (opts) => {
        console.log("BEFORE GETTING")
        const ns = await opts.ctx.dbClient.findOne({ title: 'Hamlet' })
        console.log(ns)
        console.log("GETTING THE NOTES!!")
        return ns;
    }),
    addNote: publicProcedures
        .input(note)
        .mutation(async (opts) => {
            opts.ctx.dbClient.insertOne(opts.input)
            return opts.input
        }),
});

// export type definition of API
export type AppRouter = typeof appRouter;