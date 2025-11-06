import { router, procedure } from "@trpc/server";
import { z } from "zod";
import { context } from "../context";

export const matchesRouter = router({
  getAll: procedure.query(async () => {
    return await context.prisma.match.findMany({
      include: { teamA: true, teamB: true },
    });
  }),

  create: procedure
    .input(
      z.object({
        teamAName: z.string(),
        teamBName: z.string(),
        runsA: z.number(),
        wicketsA: z.number(),
        oversA: z.number(),
        runsB: z.number(),
        wicketsB: z.number(),
        oversB: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const teamA = await context.prisma.team.create({
        data: { name: input.teamAName },
      });

      const teamB = await context.prisma.team.create({
        data: { name: input.teamBName },
      });

      return await context.prisma.match.create({
        data: {
          teamAId: teamA.id,
          teamBId: teamB.id,
          runsA: input.runsA,
          wicketsA: input.wicketsA,
          oversA: input.oversA,
          runsB: input.runsB,
          wicketsB: input.wicketsB,
          oversB: input.oversB,
        },
      });
    }),
});
