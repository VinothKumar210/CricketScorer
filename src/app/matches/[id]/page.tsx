import { notFound } from 'next/navigation';

// Mock data - in a real app, this would come from an API
const getMatchDetails = (id: string) => {
  const matches = [
    {
      id: '1',
      teamA: 'Mumbai Indians',
      teamB: 'Chennai Super Kings',
      date: '2023-04-09',
      venue: 'Wankhede Stadium',
      status: 'Completed',
      toss: 'Mumbai Indians won the toss and chose to bat',
      scorecard: {
        teamA: {
          name: 'Mumbai Indians',
          score: '178/4',
          overs: '20',
          innings: [
            { player: 'Rohit Sharma', runs: 45, balls: 30, fours: 5, sixes: 2, strikeRate: 150 },
            { player: 'Ishan Kishan', runs: 32, balls: 25, fours: 3, sixes: 1, strikeRate: 128 },
            { player: 'Suryakumar Yadav', runs: 68, balls: 35, fours: 7, sixes: 4, strikeRate: 194.28 },
            { player: 'Kieron Pollard', runs: 22, balls: 12, fours: 1, sixes: 2, strikeRate: 183.33 },
          ],
          bowling: [
            { player: 'Jasprit Bumrah', overs: '4', maidens: '0', runs: '25', wickets: '2', economy: '6.25' },
            { player: 'Trent Boult', overs: '4', maidens: '0', runs: '32', wickets: '1', economy: '8.00' },
          ]
        },
        teamB: {
          name: 'Chennai Super Kings',
          score: '165/9',
          overs: '20',
          innings: [
            { player: 'Ruturaj Gaikwad', runs: 38, balls: 28, fours: 4, sixes: 1, strikeRate: 135.71 },
            { player: 'Faf du Plessis', runs: 42, balls: 30, fours: 5, sixes: 1, strikeRate: 140 },
            { player: 'Moeen Ali', runs: 28, balls: 20, fours: 3, sixes: 1, strikeRate: 140 },
          ],
          bowling: [
            { player: 'Deepak Chahar', overs: '4', maidens: '0', runs: '32', wickets: '1', economy: '8.00' },
            { player: 'Shardul Thakur', overs: '4', maidens: '0', runs: '38', wickets: '2', economy: '9.50' },
          ]
        },
      }
    }
  ];

  return matches.find(match => match.id === id);
};

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const match = getMatchDetails(params.id);

  if (!match) {
    notFound();
  }

  const { teamA, teamB, date, venue, status, toss, scorecard } = match;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Match Header */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {teamA} vs {teamB}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {' • '}
              {venue}
            </p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    status === 'Live' ? 'bg-red-100 text-red-800' :
                    status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {status}
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Toss</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{toss}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Scorecard */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Scorecard</h3>
          </div>
          
          {/* Team A Innings */}
          <div className="px-4 py-5 sm:p-0">
            <h4 className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {scorecard.teamA.name} - {scorecard.teamA.score} ({scorecard.teamA.overs} overs)
            </h4>
            
            <div className="mt-4 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Batsman
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Runs
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Balls
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            4s
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            6s
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            SR
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {scorecard.teamA.innings.map((player, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {player.player}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {player.runs}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {player.balls}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {player.fours}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {player.sixes}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {player.strikeRate}
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
        </div>
      </div>
    </div>
  );
}
