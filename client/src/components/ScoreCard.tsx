import React from "react";

interface ScoreCardProps {
    teamName : string;
    runs : number;
    wickets : number;
    overs : number;
}

const ScoreCard : React.FC<ScoreCardProps> = ({teamName, runs ,wickets , overs}) => {
    return (
        <div className="border rounded-md p-4 mb-4 shadow-md bg-white">
            <h2 className="text-xl font-bold">{teamName}</h2>
            <p>Runs : {runs}</p>
            <p>Wickets : {wickets}</p>
            <p>Overs : {overs}</p>

        </div>
    );
};

export default ScoreCard;