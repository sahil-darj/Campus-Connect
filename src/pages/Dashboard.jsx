import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Heart, TrendingUp, User, Mail, GraduationCap, School } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your dashboard</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const mockApplications = [
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'Google',
      type: 'internship',
      status: 'Under Review',
      appliedDate: '2024-01-20',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 2,
      title: 'AI/ML Hackathon 2024',
      company: 'Stanford University',
      type: 'hackathon',
      status: 'Registered',
      appliedDate: '2024-01-15',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Microsoft',
      type: 'internship',
      status: 'Interview Scheduled',
      appliedDate: '2024-01-18',
      statusColor: 'bg-blue-100 text-blue-800'
    }
  ];

  const mockSavedOpportunities = [
    {
      id: 4,
      title: 'Full Stack Web Development',
      company: 'Coursera',
      type: 'course',
      deadline: '2024-02-28'
    },
    {
      id: 5,
      title: 'Blockchain Developer Challenge',
      company: 'Ethereum Foundation',
      type: 'hackathon',
      deadline: '2024-02-25'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">{user.major} • {user.year}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-gray-600 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <School className="w-4 h-4 mr-2" />
                <span>{user.university}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-800">{mockApplications.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Saved</p>
                <p className="text-2xl font-bold text-gray-800">{mockSavedOpportunities.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-800">1</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Profile Views</p>
                <p className="text-2xl font-bold text-gray-800">24</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
              <Link to="/applications" className="text-blue-600 hover:text-blue-800 text-sm">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{application.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${application.statusColor}`}>
                      {application.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{application.company}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="capitalize">{application.type}</span>
                    <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Opportunities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Saved Opportunities</h2>
              <Link to="/saved" className="text-blue-600 hover:text-blue-800 text-sm">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockSavedOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{opportunity.title}</h3>
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                  </div>
                  <p className="text-gray-600 mb-2">{opportunity.company}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="capitalize">{opportunity.type}</span>
                    <span>Due: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Upcoming Deadlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-red-800">AI/ML Hackathon</h3>
                <Calendar className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-red-600 text-sm">Due in 3 days</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-yellow-800">Data Science Course</h3>
                <GraduationCap className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-yellow-600 text-sm">Due in 1 week</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-green-800">Summer Internship</h3>
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-green-600 text-sm">Due in 2 weeks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;