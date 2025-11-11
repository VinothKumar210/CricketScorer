'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserGroupIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { PlayerStats, PlayerOption, PlayerComparisonData } from '@/types/player';

// Mock data - in a real app, this would come from an API
const mockPlayers: PlayerOption[] = [
  { id: '1', name: 'Rohit Sharma', team: 'Mumbai Indians' },
  { id: '2', name: 'Virat Kohli', team: 'Royal Challengers Bangalore' },
  { id: '3', name: 'Jasprit Bumrah', team: 'Mumbai Indians' },
  { id: '4', name: 'MS Dhoni', team: 'Chennai Super Kings' },
];

// Mock player stats
const mockPlayerStats: PlayerComparisonData = {
  '1': {
    id: '1',
    name: 'Rohit Sharma',
    team: 'Mumbai Indians',
    role: 'Batsman',
    matches: 200,
    runs: 5230,
    average: 31.31,
    strikeRate: 130.82,
    highestScore: 109,
    fifties: 34,
    hundreds: 1,
    wickets: 8,
    bestBowling: '4/6',
    economy: 6.50,
    catches: 50,
  },
  '2': {
    id: '2',
    name: 'Virat Kohli',
    team: 'Royal Challengers Bangalore',
    role: 'Batsman',
    matches: 223,
    runs: 6624,
    average: 36.20,
    strikeRate: 129.15,
    highestScore: 113,
    fifties: 44,
    hundreds: 5,
    wickets: 4,
    bestBowling: '2/25',
    economy: 7.42,
    catches: 103,
  },
  '3': {
    id: '3',
    name: 'Jasprit Bumrah',
    team: 'Mumbai Indians',
    role: 'Bowler',
    matches: 120,
    runs: 150,
    average: 8.33,
    strikeRate: 83.33,
    highestScore: 16,
    wickets: 145,
    bestBowling: '5/10',
    economy: 7.39,
    fiveWickets: 2,
    catches: 25,
  },
  '4': {
    id: '4',
    name: 'MS Dhoni',
    team: 'Chennai Super Kings',
    role: 'Wicketkeeper-Batsman',
    matches: 250,
    runs: 5082,
    average: 38.79,
    strikeRate: 135.61,
    highestScore: 84,
    fifties: 24,
    stumpings: 42,
    catches: 140,
    dismissals: 182,
  },
};

export default function ComparePlayersPage() {
  const router = useRouter();
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1 && player2 && player1 !== player2) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setShowComparison(true);
        setIsLoading(false);
      }, 500);
    }
  };

  const swapPlayers = () => {
    const temp = player1;
    setPlayer1(player2);
    setPlayer2(temp);
  };

  const player1Data = player1 ? mockPlayerStats[player1] : null;
  const player2Data = player2 ? mockPlayerStats[player2] : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Home
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Compare Players</h1>
          <p className="mt-1 text-sm text-gray-500">Compare statistics between two players</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <form onSubmit={handleCompare} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label htmlFor="player1" className="block text-sm font-medium text-gray-700">
                  Player 1
                </label>
                <select
                  id="player1"
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a player</option>
                  {mockPlayers.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name} ({player.team})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={swapPlayers}
                  className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  title="Swap players"
                >
                  <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div>
                <label htmlFor="player2" className="block text-sm font-medium text-gray-700">
                  Player 2
                </label>
                <select
                  id="player2"
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a player</option>
                  {mockPlayers
                    .filter(player => player.id !== player1)
                    .map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.name} ({player.team})
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!player1 || !player2 || player1 === player2 || isLoading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  !player1 || !player2 || player1 === player2 || isLoading
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isLoading ? 'Comparing...' : 'Compare Players'}
              </button>
            </div>
          </form>

          {showComparison && player1Data && player2Data && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Player Comparison</h2>
              
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{player1Data.name}</h3>
                  <p className="text-sm text-gray-500">{player1Data.team} • {player1Data.role}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{player2Data.name}</h3>
                  <p className="text-sm text-gray-500">{player2Data.team} • {player2Data.role}</p>
                </div>
              </div>

              {/* Batting Comparison */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Batting Comparison</h3>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Stat
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          {player1Data.name}
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          {player2Data.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Matches
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          {player1Data.matches}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          {player2Data.matches}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Runs
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                          player1Data.runs > player2Data.runs ? 'font-bold text-green-600' : 'text-gray-500'
                        }`}>
                          {player1Data.runs.toLocaleString()}
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                          player2Data.runs > player1Data.runs ? 'font-bold text-green-600' : 'text-gray-500'
                        }`}>
                          {player2Data.runs.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Average
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                          player1Data.average > player2Data.average ? 'font-bold text-green-600' : 'text-gray-500'
                        }`}>
                          {player1Data.average?.toFixed(2) || '-'}
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                          player2Data.average > player1Data.average ? 'font-bold text-green-600' : 'text-gray-500'
                        }`}>
                          {player2Data.average?.toFixed(2) || '-'}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Strike Rate
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                          player1Data.strikeRate > player2Data.strikeRate ? 'font-bold text-green-600' : 'text-gray-500'
                        }`}>
                          {player1Data.strikeRate?.toFixed(2) || '-'}
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                          player2Data.strikeRate > player1Data.strikeRate ? 'font-bold text-green-600' : 'text-gray-500'
                        }`}>
                          {player2Data.strikeRate?.toFixed(2) || '-'}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Highest Score
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                          player1Data.highestScore > (player2Data.highestScore || 0) ? 'font-bold text-green-600' : 'text-gray-500'
                        }`}>
                          {player1Data.highestScore || '-'}
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                          player2Data.highestScore > (player1Data.highestScore || 0) ? 'font-bold text-green-600' : 'text-gray-500'
                        }`}>
                          {player2Data.highestScore || '-'}
                        </td>
                      </tr>
                      {player1Data.fifties !== undefined && player2Data.fifties !== undefined && (
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            50s/100s
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                            {player1Data.fifties ?? '-'}/{player1Data.hundreds ?? '-'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                            {player2Data.fifties ?? '-'}/{player2Data.hundreds ?? '-'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bowling Comparison */}
              {(player1Data.wickets !== undefined || player2Data.wickets !== undefined) && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Bowling Comparison</h3>
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Stat
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            {player1Data.name}
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                            {player2Data.name}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            Wickets
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                            (player1Data.wickets || 0) > (player2Data.wickets || 0) ? 'font-bold text-green-600' : 'text-gray-500'
                          }`}>
                            {player1Data.wickets ?? '-'}
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                            (player2Data.wickets || 0) > (player1Data.wickets || 0) ? 'font-bold text-green-600' : 'text-gray-500'
                          }`}>
                            {player2Data.wickets ?? '-'}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            Best Bowling
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                            {player1Data.bestBowling ?? '-'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                            {player2Data.bestBowling ?? '-'}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            Economy
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                            (player1Data.economy || 0) < (player2Data.economy || 0) ? 'font-bold text-green-600' : 'text-gray-500'
                          }`}>
                            {player1Data.economy?.toFixed(2) ?? '-'}
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                            (player2Data.economy || 0) < (player1Data.economy || 0) ? 'font-bold text-green-600' : 'text-gray-500'
                          }`}>
                            {player2Data.economy?.toFixed(2) ?? '-'}
                          </td>
                        </tr>
                        {player1Data.fiveWickets !== undefined && player2Data.fiveWickets !== undefined && (
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              5 Wickets
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                              {player1Data.fiveWickets ?? '-'}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                              {player2Data.fiveWickets ?? '-'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Fielding Comparison */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Fielding Comparison</h3>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Stat
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          {player1Data.name}
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          {player2Data.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Catches
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                          (player1Data.catches || 0) > (player2Data.catches || 0) ? 'font-bold text-green-600' : 'text-gray-500'
                        }`}>
                          {player1Data.catches || 0}
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center ${
                          (player2Data.catches || 0) > (player1Data.catches || 0) ? 'font-bold text-green-600' : 'text-gray-500'
                        }`}>
                          {player2Data.catches || 0}
                        </td>
                      </tr>
                      {(player1Data.stumpings !== undefined || player2Data.stumpings !== undefined) && (
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            Stumpings
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                            {player1Data.stumpings ?? '-'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                            {player2Data.stumpings ?? '-'}
                          </td>
                        </tr>
                      )}
                      {(player1Data.dismissals !== undefined || player2Data.dismissals !== undefined) && (
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            Dismissals
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                            {player1Data.dismissals ?? '-'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                            {player2Data.dismissals ?? '-'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
