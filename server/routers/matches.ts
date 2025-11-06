import { router } from "@trpc/server";
import { context } from "../context";

export const matchesRouter = router({
  getAll: async () => {
    return await context.prisma.match.findMany({
      include: { teamA: true, teamB: true },
    });
  },
  create: async ({ input }: { input: { teamAId: string; teamBId: string; runsA: number; wicketsA: number; oversA: number; runsB: number; wicketsB: number; oversB: number; } }) => {
    return await context.prisma.match.create({
      data: input,
    });
  },
});
