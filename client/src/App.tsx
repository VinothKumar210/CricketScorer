import React from "react";
import Header from "./components/Header";
import ScoreCard from "./components/ScoreCard";
import { trpc } from "./trpc";
import AddMatchForm from "./components/AddMatchForm";


const App: React.FC = () => {
  const matchesQuery = trpc.matches.getAll.useQuery();

  if (matchesQuery.isLoading) return <p>Loading matches...</p>;
  if (matchesQuery.isError) return <p>Error loading matches</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4">
        {matchesQuery.data?.map((match) => (
          <ScoreCard
            key={match.id}
            teamName={match.teamA.name}
            runs={match.runsA}
            wickets={match.wicketsA}
            overs={match.oversA}
          />
        ))}
        {matchesQuery.data?.map((match) => (
          <ScoreCard
            key={match.id + "-b"}
            teamName={match.teamB.name}
            runs={match.runsB}
            wickets={match.wicketsB}
            overs={match.oversB}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
