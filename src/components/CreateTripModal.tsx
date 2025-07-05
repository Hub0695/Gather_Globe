import React, { useState } from 'react';
import { X, Calendar, MapPin, DollarSign, Search, Check } from 'lucide-react';
import { countries, travelPreferences } from '../data/countries';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface CreateTripModalProps {
  onClose: () => void;
  onTripCreated?: () => void;
}

const CreateTripModal: React.FC<CreateTripModalProps> = ({ onClose, onTripCreated }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    country: '',
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
    preferences: [] as string[]
  });

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleCountrySelect = (country: { code: string; name: string }) => {
    setFormData(prev => ({ ...prev, country: country.name }));
    setCountrySearch(country.name);
    setShowCountryDropdown(false);
  };

  const handlePreferenceToggle = (preferenceId: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preferenceId)
        ? prev.preferences.filter(p => p !== preferenceId)
        : [...prev.preferences, preferenceId]
    }));
  };

  const generateAIItinerary = async (tripData: any) => {
    // This would integrate with OpenAI API in a real implementation
    const preferences = tripData.preferences.map((id: string) => 
      travelPreferences.find(p => p.id === id)?.label
    ).join(', ');

    const prompt = `Create a detailed day-wise itinerary for a trip to ${tripData.destination}, ${tripData.country} from ${tripData.startDate} to ${tripData.endDate}. 
    Budget: $${tripData.budget}
    Preferences: ${preferences}
    Include travel time for preparation and consider the user's interests.`;

    // Mock AI response - in production, this would call OpenAI API
    const mockItinerary = {
      days: [
        {
          day: 1,
          title: 'Arrival & City Orientation',
          activities: [
            'Airport pickup and hotel check-in',
            'Local neighborhood exploration',
            'Welcome dinner at traditional restaurant'
          ]
        },
        {
          day: 2,
          title: 'Cultural Immersion',
          activities: [
            'Historical site visits',
            'Local market exploration',
            'Cultural workshop or class'
          ]
        }
      ],
      totalDays: Math.ceil((new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) / (1000 * 60 * 60 * 24)),
      estimatedCost: tripData.budget,
      recommendations: [
        'Pack comfortable walking shoes',
        'Learn basic local phrases',
        'Check weather forecast before departure'
      ]
    };

    return mockItinerary;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Generate AI itinerary
      const aiItinerary = await generateAIItinerary(formData);

      // Create trip in Supabase
      const { data: trip, error } = await supabase
        .from('trips')
        .insert({
          title: formData.title,
          destination: formData.destination,
          country: formData.country,
          start_date: formData.startDate,
          end_date: formData.endDate,
          budget: parseInt(formData.budget),
          description: formData.description,
          preferences: formData.preferences,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      // Store AI-generated itinerary (in a real app, this would go to a separate table)
      console.log('AI Generated Itinerary:', aiItinerary);
      
      onTripCreated?.();
      onClose();
    } catch (error) {
      console.error('Error creating trip:', error);
      if (error instanceof Error) {
        if (error.message.includes('relation') && error.message.includes('does not exist')) {
          alert('Database tables not set up. Please contact support.');
        } else {
          alert(`Failed to create trip: ${error.message}`);
        }
      } else {
        alert('Failed to create trip. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate minimum date (today) and add travel preparation time
  const today = new Date();
  const minStartDate = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days from now for preparation
  const minStartDateString = minStartDate.toISOString().split('T')[0];

  // Calculate minimum end date (day after start date)
  const minEndDate = formData.startDate 
    ? new Date(new Date(formData.startDate).getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0]
    : minStartDateString;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Create New Trip</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g., Tokyo Adventure"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination City
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Tokyo"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={countrySearch}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    setShowCountryDropdown(true);
                    setFormData(prev => ({ ...prev, country: e.target.value }));
                  }}
                  onFocus={() => setShowCountryDropdown(true)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Search for a country..."
                />
                {showCountryDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredCountries.slice(0, 10).map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      >
                        {country.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
                <span className="text-xs text-gray-500 block">
                  (Includes 3 days for travel preparation)
                </span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  required
                  min={minStartDateString}
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  required
                  min={minEndDate}
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                required
                min="1"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="2500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Travel Preferences
              <span className="text-xs text-gray-500 block">
                Select your interests to get personalized AI recommendations
              </span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {travelPreferences.map((preference) => (
                <button
                  key={preference.id}
                  type="button"
                  onClick={() => handlePreferenceToggle(preference.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    formData.preferences.includes(preference.id)
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg mb-1">{preference.icon}</div>
                      <div className="text-sm font-medium">{preference.label}</div>
                    </div>
                    {formData.preferences.includes(preference.id) && (
                      <Check className="h-5 w-5 text-teal-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              rows={3}
              placeholder="Tell us more about your trip plans..."
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Trip...' : 'Create Trip & Generate AI Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTripModal;