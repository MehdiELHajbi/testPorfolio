import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Camera, Calendar, Bell, CheckCircle, AlertCircle,
  ChevronRight, Plus, Eye, MessageSquare, Calendar as CalendarIcon
} from 'lucide-react';

// Mock data
const activityData = Array.from({ length: 7 }, (_, i) => ({
  date: format(new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), 'dd MMM', { locale: fr }),
  views: Math.floor(Math.random() * 100) + 20
}));

const profileCompletionData = [
  { name: 'Complété', value: 75 },
  { name: 'À compléter', value: 25 }
];

const COMPLETION_COLORS = ['#9333EA', '#E9D5FF'];

const popularPhotos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800', views: 1234 },
  { id: 2, url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', views: 987 },
];

const upcomingEvents = [
  { id: 1, title: 'Shooting Photo Mode', date: '2024-03-15', type: 'shooting' },
  { id: 2, title: 'Défilé Printemps', date: '2024-03-18', type: 'runway' },
];

const recentActivity = [
  { id: 1, type: 'view', message: 'Nouveau visiteur sur votre portfolio', time: '5 min' },
  { id: 2, type: 'contact', message: 'Message reçu de Studio Mode', time: '1h' },
];

export default function ModelDashboard() {
  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vues Portfolio</p>
              <p className="text-xl font-semibold text-gray-900">2,847</p>
            </div>
            <Eye className="h-6 w-6 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Contacts</p>
              <p className="text-xl font-semibold text-gray-900">47</p>
            </div>
            <MessageSquare className="h-6 w-6 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Événements</p>
              <p className="text-xl font-semibold text-gray-900">5</p>
            </div>
            <CalendarIcon className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Activity Chart */}
        <div className="col-span-2 bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Activité sur 7 jours</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#9333EA" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Profil</h3>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={profileCompletionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {profileCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COMPLETION_COLORS[index % COMPLETION_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-sm text-gray-500">
            75% complété
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Popular Media */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Médias populaires</h3>
            <Link to="/media" className="text-xs text-purple-600 hover:text-purple-700">
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {popularPhotos.map(photo => (
              <div key={photo.id} className="flex items-center space-x-3">
                <img
                  src={photo.url}
                  alt="Popular media"
                  className="h-16 w-16 object-cover rounded-lg"
                />
                <div>
                  <p className="text-xs font-medium text-gray-900">{photo.views} vues</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Événements</h3>
            <Link to="/calendar" className="text-xs text-purple-600 hover:text-purple-700">
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-xs font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(event.date), 'dd MMM yyyy', { locale: fr })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Activité récente</h3>
            <Link to="/activity" className="text-xs text-purple-600 hover:text-purple-700">
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-center space-x-3">
                {activity.type === 'view' && <Eye className="h-4 w-4 text-blue-500" />}
                {activity.type === 'contact' && <MessageSquare className="h-4 w-4 text-green-500" />}
                <div>
                  <p className="text-xs text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-4 right-4">
        <div className="flex items-center space-x-2">
          <button className="bg-purple-600 text-white rounded-full p-2 shadow-lg hover:bg-purple-700">
            <Camera className="h-4 w-4" />
          </button>
          <button className="bg-purple-600 text-white rounded-full p-2 shadow-lg hover:bg-purple-700">
            <Calendar className="h-4 w-4" />
          </button>
          <button className="bg-purple-600 text-white rounded-full p-2 shadow-lg hover:bg-purple-700 relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}