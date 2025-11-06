import React from "react";
import Header from "./components/Header";
import ScoreCard from "./components/ScoreCard";

const App: React.FC = () => {
    return (
        <div className = "min-h-screen bd-gray-100">
            <Header/>
            <main className="p-4">
                <ScoreCard teamName="Team A" runs={250} wickets={6} overs={43.3} />
                <ScoreCard teamName="Team B" runs={200} wickets={8} overs={45.5} />
            </main>
        </div>
    );
};

export default App;