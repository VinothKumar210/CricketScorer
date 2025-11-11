'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon, XMarkIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

// Mock data - in a real app, this would come from an API
const allPlayers = [
  {
    id: '1',
    teamId: '1',
    teamName: 'Mumbai Indians',
    name: 'Rohit Sharma',
    role: 'Batsman',
    jerseyNumber: 45,
    matches: 200,
    runs: 5230,
    battingAvg: 31.5,
    battingSR: 130.5,
    hundreds: 1,
    fifties: 40,
    wickets: 8,
    bowlingAvg: 0,
    bowlingSR: 0,
    economy: 7.2,
  },
  {
    id: '2',
    teamId: '1',
    teamName: 'Mumbai Indians',
    name: 'Jasprit Bumrah',
    role: 'Bowler',
    jerseyNumber: 93,
    matches: 120,
    runs: 150,
    battingAvg: 7.5,
    battingSR: 95.2,
    hundreds: 0,
    fifties: 0,
    wickets: 145,
    bowlingAvg: 23.1,
    bowlingSR: 18.3,
    economy: 7.5,
  },
  {
    id: '3',
    teamId: '2',
    teamName: 'Chennai Super Kings',
    name: 'MS Dhoni',
    role: 'Wicketkeeper',
    jerseyNumber: 7,
    matches: 250,
    runs: 4978,
    battingAvg: 39.8,
    battingSR: 136.2,
    hundreds: 0,
    fifties: 24,
    wickets: 0,
    bowlingAvg: 0,
    bowlingSR: 0,
    economy: 0,
  },
  {
    id: '4',
    teamId: '3',
    teamName: 'Royal Challengers Bangalore',
    name: 'Virat Kohli',
    role: 'Batsman',
    jerseyNumber: 18,
    matches: 240,
    runs: 7263,
    battingAvg: 37.2,
    battingSR: 130.0,
    hundreds: 7,
    fifties: 50,
    wickets: 4,
    bowlingAvg: 42.5,
    bowlingSR: 24.0,
    economy: 10.6,
  },
];

type Player = typeof allPlayers[0];

export default function ComparePlayersPage() {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Player[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = allPlayers.filter(
      (player) =>
        !selectedPlayers.some((p) => p.id === player.id) &&
        (player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         player.teamName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setSuggestions(filtered);
  }, [searchTerm, selectedPlayers]);

  const addPlayer = (player: Player) => {
    if (selectedPlayers.length < 4 && !selectedPlayers.some(p => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player]);
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const removePlayer = (playerId: string) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
  };

  const formatValue = (value: number, suffix: string = '') => {
    if (value === 0) return '-';
    return value % 1 === 0 ? `${value}${suffix}` : value.toFixed(2) + suffix;
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Compare Players</h1>
          <p className="mt-2 text-sm text-gray-500">
            Compare statistics between up to 4 players
          </p>
        </div>

        {/* Player Selector */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px] flex flex-col">
                {selectedPlayers[index] ? (
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{selectedPlayers[index].name}</h3>
                        <p className="text-sm text-gray-500">{selectedPlayers[index].teamName}</p>
                        <p className="text-xs text-gray-400">#{selectedPlayers[index].jerseyNumber} • {selectedPlayers[index].role}</p>
                      </div>
                      <button
                        onClick={() => removePlayer(selectedPlayers[index].id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4 space-y-1">
                      <p className="text-sm">
                        <span className="text-gray-500">Matches:</span>{' '}
                        <span className="font-medium">{selectedPlayers[index].matches}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Runs:</span>{' '}
                        <span className="font-medium">{selectedPlayers[index].runs}</span>
                      </p>
                      {selectedPlayers[index].wickets > 0 && (
                        <p className="text-sm">
                          <span className="text-gray-500">Wickets:</span>{' '}
                          <span className="font-medium">{selectedPlayers[index].wickets}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <UserIcon className="h-12 w-12 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search players to compare..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {suggestions.map((player) => (
                      <div
                        key={player.id}
                        className="px-4 py-2 text-sm text-gray-900 hover:bg-indigo-100 cursor-pointer flex items-center"
                        onMouseDown={() => addPlayer(player)}
                      >
                        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div>{player.name}</div>
                          <div className="text-xs text-gray-500">
                            {player.teamName} • {player.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {selectedPlayers.length === 0 
                ? 'Select 2-4 players to compare' 
                : selectedPlayers.length === 1 
                  ? 'Add 1-3 more players to compare' 
                  : 'Add more players or scroll down to see comparison'}
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        {selectedPlayers.length >= 2 && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg overflow-x-auto">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Player Comparison</h3>
            </div>
            <div className="min-w-max">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                      Statistic
                    </th>
                    {selectedPlayers.map((player) => (
                      <th key={player.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                        {player.name}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Team</td>
                    {selectedPlayers.map((player) => (
                      <td key={player.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.teamName}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Role</td>
                    {selectedPlayers.map((player) => (
                      <td key={player.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.role}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Matches</td>
                    {selectedPlayers.map((player) => (
                      <td key={player.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.matches}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Runs</td>
                    {selectedPlayers.map((player) => (
                      <td key={player.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.runs.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Batting Average</td>
                    {selectedPlayers.map((player) => (
                      <td key={player.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatValue(player.battingAvg)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Batting Strike Rate</td>
                    {selectedPlayers.map((player) => (
                      <td key={player.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatValue(player.battingSR)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">100s/50s</td>
                    {selectedPlayers.map((player) => (
                      <td key={player.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.hundreds}/{player.fifties}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wickets</td>
                    {selectedPlayers.map((player) => (
                      <td key={player.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.wickets > 0 ? player.wickets : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bowling Average</td>
                    {selectedPlayers.map((player) => (
                      <td key={player.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatValue(player.bowlingAvg)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Economy</td>
                    {selectedPlayers.map((player) => (
                      <td key={player.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.economy > 0 ? player.economy.toFixed(2) : '-'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
