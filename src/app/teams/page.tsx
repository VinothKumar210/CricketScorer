import Link from 'next/link';

// Mock data - in a real app, this would come from an API
const teams = [
  {
    id: 1,
    name: 'Mumbai Indians',
    city: 'Mumbai',
    captain: 'Rohit Sharma',
    totalMatches: 231,
    won: 138,
    logo: '/logos/mi.png',
  },
  {
    id: 2,
    name: 'Chennai Super Kings',
    city: 'Chennai',
    captain: 'MS Dhoni',
    totalMatches: 225,
    won: 131,
    logo: '/logos/csk.png',
  },
  {
    id: 3,
    name: 'Royal Challengers Bangalore',
    city: 'Bengaluru',
    captain: 'Faf du Plessis',
    totalMatches: 241,
    won: 114,
    logo: '/logos/rcb.png',
  },
];

export default function TeamsPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage all cricket teams.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/teams/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Team
          </Link>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <div key={team.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
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
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {team.city}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {team.name}
                      </div>
                    </dd>
                    <dt className="mt-2 text-sm font-medium text-gray-500">
                      Captain: {team.captain}
                    </dt>
                  </dl>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <div className="text-gray-500">Matches</div>
                  <div className="font-medium text-gray-900">{team.totalMatches}</div>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                  <div className="text-gray-500">Won</div>
                  <div className="font-medium text-green-600">{team.won}</div>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/teams/${team.id}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View team <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
