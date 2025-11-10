import Link from 'next/link';

// Mock data - in a real app, this would come from an API
const getTeamDetails = (id: string) => {
  const teams = [
    {
      id: '1',
      name: 'Mumbai Indians',
      city: 'Mumbai',
      founded: 2008,
      homeGround: 'Wankhede Stadium',
      captain: 'Rohit Sharma',
      coach: 'Mahela Jayawardene',
      logo: '/logos/mi.png',
      totalMatches: 231,
      won: 138,
      lost: 87,
      tied: 6,
      players: [
        { id: 1, name: 'Rohit Sharma', role: 'Batsman', matches: 200, runs: 5230, wickets: 0 },
        { id: 2, name: 'Jasprit Bumrah', role: 'Bowler', matches: 120, runs: 150, wickets: 145 },
        { id: 3, name: 'Suryakumar Yadav', role: 'Batsman', matches: 130, runs: 2900, wickets: 2 },
        { id: 4, name: 'Kieron Pollard', role: 'All-rounder', matches: 180, runs: 3400, wickets: 68 },
      ],
    },
  ];

  return teams.find(team => team.id === id);
};

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const team = getTeamDetails(params.id);

  if (!team) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="mt-2 text-lg font-medium text-gray-900">Team not found</h3>
          <p className="mt-1 text-sm text-gray-500">The team you're looking for doesn't exist.</p>
          <div className="mt-6">
            <Link
              href="/teams"
              className="text-base font-medium text-indigo-600 hover:text-indigo-500"
            >
              Go back to teams<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl leading-6 font-medium text-gray-900">
                {team.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {team.city} • {team.homeGround}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
              {team.logo ? (
                <img className="h-12 w-12" src={team.logo} alt={team.name} />
              ) : (
                <span className="text-gray-400 text-2xl font-bold">
                  {team.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Captain</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {team.captain}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Head Coach</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {team.coach}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Founded</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {team.founded}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Record</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {team.won} wins, {team.lost} losses, {team.tied} tied in {team.totalMatches} matches
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Players Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Squad</h3>
          <Link
            href={`/teams/${params.id}/add-player`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Player
          </Link>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {team.players.map((player) => (
              <li key={player.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/teams/${params.id}/players/${player.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500 truncate"
                    >
                      {player.name}
                    </Link>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {player.role}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Matches: {player.matches}
                      </p>
                      {player.runs > 0 && (
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          Runs: {player.runs}
                        </p>
                      )}
                      {player.wickets > 0 && (
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          Wickets: {player.wickets}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
