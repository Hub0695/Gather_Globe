import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Calendar, MapPin, DollarSign, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import TripCard from '../components/TripCard';
import CreateTripModal from '../components/CreateTripModal';
import ChatAssistant from '../components/ChatAssistant';

interface Trip {
  id: string;
  title: string;
  destination: string;
  country: string;
  start_date: string;
  end_date: string;
  budget: number;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [user]);

  const fetchTrips = async () => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('created_by', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching trips:', error);
        return;
      }

      setTrips(data || []);
    } catch (error) {
      console.error('Error in fetchTrips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTripCreated = () => {
    fetchTrips();
  };

  const formatTripForCard = (trip: Trip) => ({
    id: trip.id,
    title: trip.title,
    destination: `${trip.destination}, ${trip.country}`,
    dates: `${new Date(trip.start_date).toLocaleDateString()} - ${new Date(trip.end_date).toLocaleDateString()}`,
    members: 1, // For now, just the creator
    budget: trip.budget,
    image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1'
  });

  const totalBudget = trips.reduce((sum, trip) => sum + trip.budget, 0);
  const nextTrip = trips.find(trip => new Date(trip.start_date) > new Date());
  const daysUntilNextTrip = nextTrip 
    ? Math.ceil((new Date(nextTrip.start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const stats = [
    { label: 'Active Trips', value: trips.length.toString(), icon: MapPin, color: 'bg-blue-500' },
    { label: 'Total Members', value: trips.length.toString(), icon: Users, color: 'bg-green-500' },
    { label: 'Total Budget', value: `$${totalBudget.toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Days Until Next Trip', value: daysUntilNextTrip > 0 ? daysUntilNextTrip.toString() : '-', icon: Calendar, color: 'bg-orange-500' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Ready to plan your next adventure?
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <button
              onClick={() => setShowChat(true)}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              AI Assistant
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Trip
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trips */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Trips</h2>
            {trips.length > 3 && (
              <Link
                to="/trips"
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                View all
              </Link>
            )}
          </div>
          
          {trips.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No trips yet</h3>
              <p className="text-gray-600 mb-6">Create your first trip to start planning your adventure!</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center mx-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Trip
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.slice(0, 6).map((trip) => (
                <TripCard key={trip.id} trip={formatTripForCard(trip)} />
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {trips.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <p className="text-gray-600">
                  <span className="font-medium">You</span> created a new trip: {trips[0]?.title}
                </p>
                <span className="text-gray-400 text-sm">
                  {new Date(trips[0]?.created_at).toLocaleDateString()}
                </span>
              </div>
              {trips.length > 1 && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-600">
                    AI generated itinerary for {trips[1]?.title}
                  </p>
                  <span className="text-gray-400 text-sm">
                    {new Date(trips[1]?.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateTripModal 
          onClose={() => setShowCreateModal(false)} 
          onTripCreated={handleTripCreated}
        />
      )}
      {showChat && (
        <ChatAssistant onClose={() => setShowChat(false)} />
      )}
    </div>
  );
};

export default Dashboard;