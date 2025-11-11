'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';

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
    wickets: 8,
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
    wickets: 145,
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
    wickets: 0,
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
    wickets: 4,
  },
];

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState(allPlayers);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFilteredPlayers(allPlayers);
        return;
      }

      setIsLoading(true);
      
      // Simulate API call with debounce
      const filtered = allPlayers.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.jerseyNumber.toString().includes(searchTerm)
      );
      
      setFilteredPlayers(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Players</h1>
          <p className="mt-2 text-sm text-gray-500">
            Search and view player profiles across all teams
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search players by name, team, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredPlayers.length === 0 ? (
          <div className="text-center py-12">
            <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No players found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try a different search term' : 'No players available'}
            </p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredPlayers.map((player) => (
                <li key={`${player.teamId}-${player.id}`}>
                  <Link 
                    href={`/teams/${player.teamId}/players/${player.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <UserIcon className="h-6 w-6 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-indigo-600 truncate">
                              {player.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {player.teamName} • #{player.jerseyNumber}
                            </p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            player.role === 'Batsman' ? 'bg-green-100 text-green-800' :
                            player.role === 'Bowler' ? 'bg-blue-100 text-blue-800' :
                            player.role === 'All-rounder' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {player.role}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex space-x-4">
                          <p className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">{player.matches}</span>
                            <span className="ml-1">matches</span>
                          </p>
                          <p className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">{player.runs}</span>
                            <span className="ml-1">runs</span>
                          </p>
                          {player.wickets > 0 && (
                            <p className="flex items-center text-sm text-gray-500">
                              <span className="font-medium">{player.wickets}</span>
                              <span className="ml-1">wickets</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
