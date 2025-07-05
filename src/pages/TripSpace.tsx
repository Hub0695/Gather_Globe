import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, Cloud, Brain, Vote } from 'lucide-react';
import ItineraryPlanner from '../components/ItineraryPlanner';
import ExpenseTracker from '../components/ExpenseTracker';
import WeatherWidget from '../components/WeatherWidget';
import ChatAssistant from '../components/ChatAssistant';
import VotingPanel from '../components/VotingPanel';

const TripSpace = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('itinerary');
  const [showChat, setShowChat] = useState(false);

  // Mock trip data - in real app, this would come from Supabase
  const trip = {
    id: '1',
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    dates: 'March 15-25, 2024',
    members: [
      { id: '1', name: 'John Doe', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
      { id: '2', name: 'Sarah Smith', avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
      { id: '3', name: 'Mike Johnson', avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
      { id: '4', name: 'Emily Davis', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' }
    ],
    budget: 2500,
    image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&dpr=1'
  };

  const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: Brain },
    { id: 'voting', label: 'Voting', icon: Vote },
    { id: 'expenses', label: 'Expenses', icon: DollarSign },
    { id: 'weather', label: 'Weather', icon: Cloud }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${trip.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl font-bold">{trip.title}</h1>
            <p className="text-lg">{trip.destination} • {trip.dates}</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {trip.members.map((member) => (
                  <img
                    key={member.id}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src={member.avatar}
                    alt={member.name}
                  />
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-600">{trip.members.length} members</p>
                <p className="text-sm text-gray-600">Budget: ${trip.budget}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={() => setShowChat(true)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                AI Assistant
              </button>
              <button className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Invite
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'itinerary' && <ItineraryPlanner tripId={id!} />}
        {activeTab === 'voting' && <VotingPanel tripId={id!} />}
        {activeTab === 'expenses' && <ExpenseTracker tripId={id!} />}
        {activeTab === 'weather' && <WeatherWidget destination={trip.destination} />}
      </div>

      {/* Chat Assistant */}
      {showChat && (
        <ChatAssistant onClose={() => setShowChat(false)} />
      )}
    </div>
  );
};

export default TripSpace;