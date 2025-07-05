import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, MapPin, DollarSign } from 'lucide-react';

interface Trip {
  id: string;
  title: string;
  destination: string;
  dates: string;
  members: number;
  budget: number;
  image: string;
}

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <Link to={`/trip/${trip.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${trip.image})` }}
        >
          <div className="h-full bg-black bg-opacity-20 flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">{trip.title}</h3>
              <p className="text-sm opacity-90">{trip.destination}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{trip.dates}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{trip.members} members</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>${trip.budget}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="text-teal-600 font-medium">View Details</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;