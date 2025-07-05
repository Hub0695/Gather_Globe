import React, { useState } from 'react';
import { Plus, Brain, MapPin, Clock, Star, MessageCircle, ThumbsUp } from 'lucide-react';

interface ItineraryPlannerProps {
  tripId: string;
}

const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({ tripId }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([
    {
      id: '1',
      title: 'Tokyo Skytree',
      category: 'Must Visit',
      description: 'Iconic broadcasting tower with breathtaking city views',
      duration: '2-3 hours',
      votes: 8,
      comments: 3,
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1'
    },
    {
      id: '2',
      title: 'Senso-ji Temple',
      category: 'Must Visit',
      description: 'Ancient Buddhist temple in historic Asakusa district',
      duration: '1-2 hours',
      votes: 7,
      comments: 2,
      image: 'https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-temple-161251.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1'
    },
    {
      id: '3',
      title: 'Shibuya Crossing',
      category: 'Should Visit',
      description: 'Famous scramble crossing in the heart of Tokyo',
      duration: '30 minutes',
      votes: 6,
      comments: 5,
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1'
    },
    {
      id: '4',
      title: 'TeamLab Borderless',
      category: 'Could Visit',
      description: 'Digital art museum with immersive installations',
      duration: '3-4 hours',
      votes: 4,
      comments: 1,
      image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1'
    }
  ]);

  const generateSuggestions = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // In real app, this would call OpenAI API
    }, 3000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Must Visit': return 'bg-red-100 text-red-800';
      case 'Should Visit': return 'bg-yellow-100 text-yellow-800';
      case 'Could Visit': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Itinerary Planner</h2>
          <p className="text-gray-600 mt-1">AI-powered destination suggestions for your trip</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={generateSuggestions}
            disabled={isGenerating}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center"
          >
            <Brain className="h-5 w-5 mr-2" />
            {isGenerating ? 'Generating...' : 'AI Suggestions'}
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Custom
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">
            I was totally working, not just daydreaming about Tokyo 🗼☕
          </p>
          <p className="text-sm text-gray-500">
            Generating personalized suggestions based on your preferences...
          </p>
        </div>
      )}

      {/* Suggestions */}
      <div className="grid gap-6">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                <div className="lg:w-1/3 mb-4 lg:mb-0">
                  <img
                    src={suggestion.image}
                    alt={suggestion.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="lg:w-2/3">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{suggestion.title}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getCategoryColor(suggestion.category)}`}>
                        {suggestion.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{suggestion.votes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{suggestion.comments}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{suggestion.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{suggestion.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>Tokyo, Japan</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Vote
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Comment
                    </button>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryPlanner;