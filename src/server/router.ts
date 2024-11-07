import { initTRPC } from '@trpc/server';
import { z } from 'zod';

export const t = initTRPC.create();

const note = z.object({ title: z.string(), body: z.string() })
type Note = z.infer<typeof note>

const notes: Note[] = []

export const appRouter = t.router({
    getNotes: t.procedure.query((opts) => {
        console.log("GETTING THE NOTES!!")
        return notes;
    }),
    addNote: t.procedure
        .input(note)
        .mutation(async (opts) => {
            notes.push(opts.input)
            return opts.input
        }),
});

// export type definition of API
export type AppRouter = typeof appRouter;