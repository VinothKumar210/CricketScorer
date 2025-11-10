'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PencilIcon, UserIcon } from '@heroicons/react/24/outline';

// Mock data - in a real app, this would come from an API
const getPlayerDetails = (teamId: string, playerId: string) => {
  const teams = [
    {
      id: '1',
      name: 'Mumbai Indians',
      players: [
        {
          id: '1',
          name: 'Rohit Sharma',
          role: 'Batsman',
          jerseyNumber: 45,
          battingStyle: 'Right-handed',
          bowlingStyle: 'Right-arm offbreak',
          dateOfBirth: '1987-04-30',
          nationality: 'Indian',
          matches: 200,
          runs: 5230,
          wickets: 8,
          highestScore: 109,
          bestBowling: '4/6',
          average: 31.31,
          strikeRate: 130.82,
          fifties: 34,
          hundreds: 1,
        },
      ],
    },
  ];

  const team = teams.find(t => t.id === teamId);
  if (!team) return null;
  
  const player = team.players.find(p => p.id === playerId);
  return player ? { ...player, teamName: team.name } : null;
};

export default function PlayerDetailPage({ params }: { params: { id: string, playerId: string } }) {
  const router = useRouter();
  const player = getPlayerDetails(params.id, params.playerId);

  if (!player) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="mt-2 text-lg font-medium text-gray-900">Player not found</h3>
          <p className="mt-1 text-sm text-gray-500">The player you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <Link
              href={`/teams/${params.id}`}
              className="text-base font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to team<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-10 w-10 text-gray-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">
                  {player.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {player.role} • {player.teamName}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/teams/${params.id}/players/${params.playerId}/edit`}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Jersey Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {player.jerseyNumber || 'N/A'}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Age</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {player.dateOfBirth ? `${calculateAge(player.dateOfBirth)} years` : 'N/A'}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Batting Style</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {player.battingStyle || 'N/A'}
              </dd>
            </div>
            {player.bowlingStyle && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bowling Style</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {player.bowlingStyle}
                </dd>
              </div>
            )}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Nationality</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {player.nationality || 'N/A'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Player Statistics */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Career Statistics</h3>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Matches</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{player.matches || 0}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Runs</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{player.runs || 0}</div>
                      {player.average && (
                        <span className="ml-2 text-sm font-medium text-gray-500">
                          Avg: {player.average}
                        </span>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {player.wickets !== undefined && (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Wickets</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{player.wickets}</div>
                        {player.bestBowling && (
                          <span className="ml-2 text-sm font-medium text-gray-500">
                            Best: {player.bestBowling}
                          </span>
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
