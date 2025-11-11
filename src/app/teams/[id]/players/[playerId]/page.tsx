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
          notOuts: 20,
          fours: 500,
          sixes: 100,
          economy: 6.50,
          catches: 50,
          runsConceded: 320,
          fiveWickets: 0,
          stumpings: 0,
          recentMatches: [
            {
              id: '1',
              opponent: 'Chennai Super Kings',
              date: '2023-05-12',
              venue: 'Wankhede Stadium',
              runs: 56,
              balls: 32,
              fours: 6,
              sixes: 3,
              wickets: 0,
              overs: 0,
              runsConceded: 0,
              economy: 0,
              result: 'Won by 5 wickets',
              isHome: true
            },
            {
              id: '2',
              opponent: 'Royal Challengers Bangalore',
              date: '2023-05-05',
              venue: 'M. Chinnaswamy Stadium',
              runs: 12,
              balls: 8,
              fours: 2,
              sixes: 0,
              wickets: 1,
              overs: 2,
              runsConceded: 18,
              economy: 9.0,
              result: 'Lost by 12 runs',
              isHome: false
            },
            {
              id: '3',
              opponent: 'Delhi Capitals',
              date: '2023-04-28',
              venue: 'Wankhede Stadium',
              runs: 78,
              balls: 45,
              fours: 8,
              sixes: 4,
              wickets: 0,
              overs: 0,
              runsConceded: 0,
              economy: 0,
              result: 'Won by 8 wickets',
              isHome: true
            },
            {
              id: '4',
              opponent: 'Punjab Kings',
              date: '2023-04-22',
              venue: 'Punjab Cricket Stadium',
              runs: 34,
              balls: 28,
              fours: 5,
              sixes: 1,
              wickets: 0,
              overs: 0,
              runsConceded: 0,
              economy: 0,
              result: 'Lost by 4 wickets',
              isHome: false
            },
            {
              id: '5',
              opponent: 'Rajasthan Royals',
              date: '2023-04-15',
              venue: 'Wankhede Stadium',
              runs: 22,
              balls: 15,
              fours: 3,
              sixes: 1,
              wickets: 2,
              overs: 3,
              runsConceded: 24,
              economy: 8.0,
              result: 'Won by 14 runs',
              isHome: true
            }
          ]
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

        {/* Player Statistics */}
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Career Statistics</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 pb-5 sm:px-6">
            {/* Batting Stats */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Batting</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Matches</span>
                  <span className="text-sm font-medium">{player.matches}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Runs</span>
                  <span className="text-sm font-medium">{player.runs?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Highest Score</span>
                  <span className="text-sm font-medium">{player.highestScore || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Average</span>
                  <span className="text-sm font-medium">{player.average?.toFixed(2) || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Strike Rate</span>
                  <span className="text-sm font-medium">{player.strikeRate?.toFixed(2) || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">50s/100s</span>
                  <span className="text-sm font-medium">{player.fifties || 0}/{player.hundreds || 0}</span>
                </div>
              </div>
            </div>

            {/* Bowling Stats */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Bowling</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Wickets</span>
                  <span className="text-sm font-medium">{player.wickets || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Best Bowling</span>
                  <span className="text-sm font-medium">{player.bestBowling || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Average</span>
                  <span className="text-sm font-medium">{(player.wickets && player.runsConceded) ? (player.runsConceded / player.wickets).toFixed(2) : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Economy</span>
                  <span className="text-sm font-medium">{player.economy?.toFixed(2) || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">5 Wickets</span>
                  <span className="text-sm font-medium">{player.fiveWickets || 0}</span>
                </div>
              </div>
            </div>

            {/* Fielding & Other Stats */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Fielding & More</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Catches</span>
                  <span className="text-sm font-medium">{player.catches || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Stumpings</span>
                  <span className="text-sm font-medium">{player.stumpings || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Not Outs</span>
                  <span className="text-sm font-medium">{player.notOuts || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">4s/6s</span>
                  <span className="text-sm font-medium">{player.fours || 0}/{player.sixes || 0}</span>
                </div>
              </div>
            </div>
          </div>
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

        {/* Recent Performances */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Performances</h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {player.recentMatches?.length > 0 ? (
                player.recentMatches.map((match, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {match.opponent}
                        </p>
                        <p className="text-sm text-gray-500">
                          {match.date} • {match.venue}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="text-sm text-gray-900 font-medium">
                          {match.runs} runs {match.wickets ? ` & ${match.wickets} wkts` : ''}
                        </div>
                        <div className="text-sm text-gray-500">
                          {match.result}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">No recent match data available</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
