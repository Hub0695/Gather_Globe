import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, SunSnow as Snow, Wind, Thermometer, Droplets } from 'lucide-react';

interface WeatherWidgetProps {
  destination: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ destination }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock weather data - in real app, this would come from weather API
  const mockWeather = {
    current: {
      temp: 18,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      icon: 'partly-cloudy'
    },
    forecast: [
      { date: '2024-03-15', high: 22, low: 14, condition: 'Sunny', icon: 'sunny' },
      { date: '2024-03-16', high: 19, low: 12, condition: 'Cloudy', icon: 'cloudy' },
      { date: '2024-03-17', high: 16, low: 10, condition: 'Rainy', icon: 'rainy' },
      { date: '2024-03-18', high: 20, low: 13, condition: 'Partly Cloudy', icon: 'partly-cloudy' },
      { date: '2024-03-19', high: 23, low: 15, condition: 'Sunny', icon: 'sunny' }
    ],
    alerts: [
      {
        type: 'info',
        message: 'Perfect weather for outdoor activities on March 15th and 19th!'
      },
      {
        type: 'warning',
        message: 'Rain expected on March 17th - consider indoor alternatives or pack an umbrella.'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setWeather(mockWeather);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [destination]);

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sunny': return Sun;
      case 'cloudy': return Cloud;
      case 'partly-cloudy': return Cloud;
      case 'rainy': return CloudRain;
      case 'snowy': return Snow;
      default: return Sun;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Weather Forecast</h2>
        <p className="text-gray-600 mt-1">Plan your activities based on weather conditions</p>
      </div>

      {/* Current Weather */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Current Weather</h3>
            <p className="text-blue-100 mb-4">{destination}</p>
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold">{weather.current.temp}°C</div>
              <div>
                <p className="text-lg">{weather.current.condition}</p>
                <div className="flex items-center space-x-4 text-sm text-blue-100 mt-1">
                  <div className="flex items-center space-x-1">
                    <Droplets className="h-4 w-4" />
                    <span>{weather.current.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Wind className="h-4 w-4" />
                    <span>{weather.current.windSpeed} km/h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-6xl opacity-75">
            {React.createElement(getWeatherIcon(weather.current.icon), { size: 64 })}
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">5-Day Forecast</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weather.forecast.map((day, index) => {
              const WeatherIcon = getWeatherIcon(day.icon);
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {formatDate(day.date)}
                  </p>
                  <div className="flex justify-center mb-2">
                    <WeatherIcon className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{day.condition}</p>
                  <div className="flex justify-center space-x-2 text-sm">
                    <span className="font-semibold text-gray-900">{day.high}°</span>
                    <span className="text-gray-500">{day.low}°</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="space-y-4">
        {weather.alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'warning'
                ? 'bg-yellow-50 border-yellow-400'
                : 'bg-blue-50 border-blue-400'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-1 rounded-full ${
                alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                <Thermometer className={`h-5 w-5 ${
                  alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'
                }`}>
                  {alert.type === 'warning' ? 'Weather Advisory' : 'Weather Tip'}
                </p>
                <p className={`text-sm mt-1 ${
                  alert.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'
                }`}>
                  {alert.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Packing Suggestions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI Packing Suggestions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Essentials</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Light jacket for cool evenings</li>
                <li>• Comfortable walking shoes</li>
                <li>• Umbrella for March 17th</li>
                <li>• Sunglasses for sunny days</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Clothing</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Layers for temperature changes</li>
                <li>• Waterproof jacket</li>
                <li>• Breathable t-shirts</li>
                <li>• Long pants for cooler days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;