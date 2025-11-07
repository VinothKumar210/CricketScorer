import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  score1: Number,
  score2: Number,
});

export default mongoose.model("Match", MatchSchema);
