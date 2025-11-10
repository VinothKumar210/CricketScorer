'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type PlayerRole = 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicketkeeper' | 'Wicketkeeper-Batsman';

const ROLES: PlayerRole[] = [
  'Batsman',
  'Bowler',
  'All-rounder',
  'Wicketkeeper',
  'Wicketkeeper-Batsman'
];

export default function AddPlayerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    role: 'Batsman' as PlayerRole,
    jerseyNumber: '',
    battingStyle: 'Right-handed',
    bowlingStyle: '',
    dateOfBirth: '',
    nationality: 'Indian',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
      console.log('Adding player to team:', params.id, formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to team detail page on success
      router.push(`/teams/${params.id}`);
    } catch (err) {
      setError('Failed to add player. Please try again.');
      console.error('Error adding player:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link 
            href={`/teams/${params.id}`} 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            &larr; Back to Team
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Add New Player</h1>
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
                    <option>Right-handed</option>
                    <option>Left-handed</option>
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
                href={`/teams/${params.id}`}
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Adding...' : 'Add Player'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
