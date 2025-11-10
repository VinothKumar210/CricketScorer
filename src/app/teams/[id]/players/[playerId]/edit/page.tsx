'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

type PlayerRole = 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicketkeeper' | 'Wicketkeeper-Batsman';

const ROLES: PlayerRole[] = [
  'Batsman',
  'Bowler',
  'All-rounder',
  'Wicketkeeper',
  'Wicketkeeper-Batsman'
];

// Mock fetch function - in a real app, this would be an API call
const fetchPlayerDetails = async (teamId: string, playerId: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockData = {
    '1': {
      '1': {
        id: '1',
        name: 'Rohit Sharma',
        role: 'Batsman',
        jerseyNumber: '45',
        battingStyle: 'Right-handed',
        bowlingStyle: 'Right-arm offbreak',
        dateOfBirth: '1987-04-30',
        nationality: 'Indian',
      },
    },
  };

  return mockData[teamId as keyof typeof mockData]?.[playerId as keyof typeof mockData['1']] || null;
};

export default function EditPlayerPage() {
  const router = useRouter();
  const params = useParams();
  const teamId = params.id as string;
  const playerId = params.playerId as string;
  
  const [formData, setFormData] = useState({
    name: '',
    role: 'Batsman' as PlayerRole,
    jerseyNumber: '',
    battingStyle: 'Right-handed',
    bowlingStyle: '',
    dateOfBirth: '',
    nationality: 'Indian',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPlayerData = async () => {
      try {
        const playerData = await fetchPlayerDetails(teamId, playerId);
        if (playerData) {
          setFormData(prev => ({
            ...prev,
            ...playerData,
            jerseyNumber: playerData.jerseyNumber?.toString() || '',
          }));
        } else {
          setError('Player not found');
        }
      } catch (err) {
        setError('Failed to load player data');
        console.error('Error loading player:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlayerData();
  }, [teamId, playerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // In a real app, you would make an API call here
      console.log('Updating player:', { teamId, playerId, ...formData });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to player detail page on success
      router.push(`/teams/${teamId}/players/${playerId}`);
    } catch (err) {
      setError('Failed to update player. Please try again.');
      console.error('Error updating player:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <div className="mt-6">
            <Link
              href={`/teams/${teamId}`}
              className="text-base font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to team<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link 
            href={`/teams/${teamId}/players/${playerId}`} 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            &larr; Back to Player
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Edit Player</h1>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="jerseyNumber" className="block text-sm font-medium text-gray-700">
                  Jersey Number
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="jerseyNumber"
                    id="jerseyNumber"
                    min="1"
                    max="999"
                    value={formData.jerseyNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Primary Role <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="battingStyle" className="block text-sm font-medium text-gray-700">
                  Batting Style
                </label>
                <div className="mt-1">
                  <select
                    id="battingStyle"
                    name="battingStyle"
                    value={formData.battingStyle}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Right-handed">Right-handed</option>
                    <option value="Left-handed">Left-handed</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="bowlingStyle" className="block text-sm font-medium text-gray-700">
                  Bowling Style
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="bowlingStyle"
                    id="bowlingStyle"
                    placeholder="e.g., Right-arm fast, Left-arm orthodox"
                    value={formData.bowlingStyle}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    max={new Date().toISOString().split('T')[0]}
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                  Nationality
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="nationality"
                    id="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Link
                href={`/teams/${teamId}/players/${playerId}`}
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
