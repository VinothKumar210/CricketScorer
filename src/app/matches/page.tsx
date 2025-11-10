import Link from 'next/link';

// Mock data - in a real app, this would come from an API
const matches = [
  {
    id: 1,
    teamA: 'Mumbai Indians',
    teamB: 'Chennai Super Kings',
    date: '2023-04-09',
    venue: 'Wankhede Stadium',
    status: 'Live',
    scoreA: '178/4',
    scoreB: '165/9',
    oversA: '20',
    oversB: '20',
    result: 'Mumbai Indians won by 13 runs'
  },
  {
    id: 2,
    teamA: 'Royal Challengers Bangalore',
    teamB: 'Kolkata Knight Riders',
    date: '2023-04-10',
    venue: 'M. Chinnaswamy Stadium',
    status: 'Upcoming',
    scoreA: '0/0',
    scoreB: '0/0',
    oversA: '0',
    oversB: '0',
    result: 'Match starts in 2 hours'
  },
  {
    id: 3,
    teamA: 'Delhi Capitals',
    teamB: 'Punjab Kings',
    date: '2023-04-08',
    venue: 'Arun Jaitley Stadium',
    status: 'Completed',
    scoreA: '213/2',
    scoreB: '201/7',
    oversA: '20',
    oversB: '20',
    result: 'Delhi Capitals won by 12 runs'
  },
];

export default function MatchesPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
          <p className="mt-2 text-sm text-gray-700">
            View all upcoming, live, and completed matches.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/matches/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            New Match
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Match
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Venue
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {matches.map((match) => (
                    <tr key={match.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{match.teamA} vs {match.teamB}</div>
                            <div className="text-gray-500">{match.result}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{match.venue}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(match.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          match.status === 'Live' ? 'bg-red-100 text-red-800' :
                          match.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {match.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link href={`/matches/${match.id}`} className="text-indigo-600 hover:text-indigo-900">
                          View<span className="sr-only">, {match.teamA} vs {match.teamB}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
