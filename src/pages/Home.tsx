import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Brain, DollarSign, Cloud, MessageSquare, Map } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Together.
            <span className="text-teal-600"> Travel Smarter.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create collaborative trip spaces, get AI-powered suggestions, track expenses, and make travel planning effortless with your friends and family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
            >
              {user ? "Go to Dashboard" : "Start Planning"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="border border-teal-600 text-teal-600 px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need for the perfect trip
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features designed for collaborative travel planning
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaborative Spaces</h3>
            <p className="text-gray-600">
              Create trip spaces where friends can collaborate, vote on destinations, and plan together in real-time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Brain className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Suggestions</h3>
            <p className="text-gray-600">
              Get intelligent destination and activity recommendations based on your preferences and travel dates.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <DollarSign className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Expense Tracking</h3>
            <p className="text-gray-600">
              Track shared expenses and automatically calculate who owes what for transparent trip settlements.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Cloud className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Weather Integration</h3>
            <p className="text-gray-600">
              Get weather forecasts and alternative suggestions to ensure your trip goes smoothly regardless of conditions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <MessageSquare className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Travel Assistant</h3>
            <p className="text-gray-600">
              24/7 chat support for destination insights, budget tips, and personalized travel recommendations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Map className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Itineraries</h3>
            <p className="text-gray-600">
              AI-generated itineraries that adapt to your group's preferences and can be regenerated anytime.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to plan your next adventure?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Join thousands of travelers who are already planning smarter with Gather Globe.
            </p>
            <Link
              to={user ? "/dashboard" : "/login"}
              className="bg-white text-teal-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              {user ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;