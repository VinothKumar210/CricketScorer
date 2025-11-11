'use client';

import { useParams } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// Mock data - in a real app, this would come from an API
const getMatchDetails = (matchId: string) => {
  const matches = [
    {
      id: '1',
      team1: 'Mumbai Indians',
      team2: 'Chennai Super Kings',
      date: '2023-05-12',
      venue: 'Wankhede Stadium, Mumbai',
      toss: 'Mumbai Indians won the toss and chose to bat',
      result: 'Mumbai Indians won by 5 wickets',
      mom: 'Rohit Sharma',
      scorecard: {
        team1: {
          name: 'Mumbai Indians',
          score: '195/5 (20)',
          batsmen: [
            { name: 'Rohit Sharma', runs: 56, balls: 32, fours: 6, sixes: 3, out: 'c Dhoni b Chahar' },
            { name: 'Ishan Kishan', runs: 42, balls: 28, fours: 3, sixes: 2, out: 'lbw b Jadeja' },
          ],
          bowlers: [
            { name: 'Jasprit Bumrah', overs: 4, maidens: 0, runs: 28, wickets: 2, economy: 7.0 },
          ]
        },
        team2: {
          name: 'Chennai Super Kings',
          score: '190/7 (20)', 
          batsmen: [
            { name: 'Ruturaj Gaikwad', runs: 68, balls: 42, fours: 5, sixes: 3, out: 'c Pollard b Bumrah' },
          ],
          bowlers: [
            { name: 'Deepak Chahar', overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
          ]
        }
      },
      highlights: [
        'Rohit Sharma scored 50 off 28 balls',
        'Jasprit Bumrah took 2 crucial wickets',
        'Match decided in the final over'
      ]
    },
  ];

  return matches.find(match => match.id === matchId) || null;
};

export default function MatchDetailPage() {
  const params = useParams();
  const match = getMatchDetails(params.matchId as string);

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Match not found</h2>
            <p className="mt-4 text-lg text-gray-500">The requested match could not be found.</p>
            <Link 
              href="/matches" 
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" />
              Back to Matches
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/matches" 
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeftIcon className="-ml-1 mr-1 h-4 w-4" />
            Back to Matches
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          {/* Match Header */}
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {match.team1} vs {match.team2}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {match.date} • {match.venue}
                </p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {match.result}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">{match.toss}</p>
              <p className="mt-1 text-sm font-medium text-indigo-600">
                Player of the Match: {match.mom}
              </p>
            </div>
          </div>

          {/* Match Summary */}
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Match Summary</h3>
            
            {/* Team 1 Innings */}
            <div className="mb-8">
              <h4 className="font-medium text-gray-900 mb-2">{match.scorecard.team1.name} - {match.scorecard.team1.score}</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batsman</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">R</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">B</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">4s</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">6s</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {match.scorecard.team1.batsmen.map((batsman, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {batsman.name}
                          {batsman.out && <div className="text-xs text-gray-500">{batsman.out}</div>}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                          {batsman.runs}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                          {batsman.balls}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                          {batsman.fours}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                          {batsman.sixes}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                          {((batsman.runs / batsman.balls) * 100).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Team 2 Innings */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">{match.scorecard.team2.name} - {match.scorecard.team2.score}</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bowler</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">O</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">M</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">R</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Econ</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {match.scorecard.team2.bowlers.map((bowler, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {bowler.name}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                          {bowler.overs}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                          {bowler.maidens}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                          {bowler.runs}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                          {bowler.wickets}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                          {bowler.economy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Match Highlights */}
          <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Match Highlights</h3>
            <ul className="list-disc pl-5 space-y-1">
              {match.highlights.map((highlight, idx) => (
                <li key={idx} className="text-sm text-gray-700">{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
