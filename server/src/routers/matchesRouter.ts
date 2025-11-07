import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import Match from "../schemas/matchSchema";

export const matchRouter = router({
  addMatch: publicProcedure
    .input(
      z.object({
        team1: z.string(),
        team2: z.string(),
        score1: z.number(),
        score2: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const newMatch = new Match(input);
      await newMatch.save();
      return { message: "Match added successfully" };
    }),
});
