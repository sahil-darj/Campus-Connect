import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Users, DollarSign, Trophy, BookOpen, Heart, Share2, ExternalLink } from 'lucide-react';
import { mockOpportunities } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const OpportunityDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const opportunity = mockOpportunities.find(opp => opp.id === parseInt(id));

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Opportunity Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    if (user) {
      setIsApplied(true);
    } else {
      // Trigger auth modal
      alert('Please log in to apply for this opportunity');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'internship':
        return <Users className="w-5 h-5" />;
      case 'hackathon':
        return <Trophy className="w-5 h-5" />;
      case 'course':
        return <BookOpen className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getActionText = (type) => {
    switch (type) {
      case 'internship':
        return isApplied ? 'Applied' : 'Apply Now';
      case 'hackathon':
        return isApplied ? 'Registered' : 'Register';
      case 'course':
        return isApplied ? 'Enrolled' : 'Enroll';
      default:
        return 'Apply';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={opportunity.image}
                  alt={opportunity.title}
                  className="w-full h-64 object-cover"
                />
                {opportunity.trending && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Trending
                    </span>
                  </div>
                )}
                {opportunity.remote && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Remote
                    </span>
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(opportunity.type)}
                    <span className="text-sm font-medium text-blue-600 uppercase">
                      {opportunity.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleSave}
                      className={`p-2 rounded-full ${
                        isSaved ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      } hover:bg-red-100 hover:text-red-600 transition-colors`}
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {opportunity.title}
                </h1>

                <div className="flex items-center text-gray-600 mb-6">
                  <span className="text-lg font-medium">{opportunity.company}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3" />
                    <span>{opportunity.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>Due: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    {opportunity.type === 'internship' && <DollarSign className="w-5 h-5 mr-3" />}
                    {opportunity.type === 'hackathon' && <Trophy className="w-5 h-5 mr-3" />}
                    {opportunity.type === 'course' && <DollarSign className="w-5 h-5 mr-3" />}
                    <span>
                      {opportunity.type === 'internship' && opportunity.salary}
                      {opportunity.type === 'hackathon' && opportunity.prizes}
                      {opportunity.type === 'course' && opportunity.price}
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {opportunity.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h2>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Posted on {new Date(opportunity.posted).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {opportunity.type === 'internship' && `${opportunity.applicants} applicants`}
                        {opportunity.type === 'hackathon' && `${opportunity.participants} participants`}
                        {opportunity.type === 'course' && `${opportunity.enrolled} enrolled`}
                      </p>
                    </div>
                    <Link
                      to={opportunity.company.toLowerCase().replace(/\s+/g, '') + '.com'}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Company Website
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Apply Now</h3>
                <button
                  onClick={handleApply}
                  disabled={isApplied}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    isApplied
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {getActionText(opportunity.type)}
                </button>
                
                {!user && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Please log in to apply
                  </p>
                )}
              </div>

              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-800 mb-4">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications</span>
                    <span className="font-medium">
                      {opportunity.type === 'internship' && opportunity.applicants}
                      {opportunity.type === 'hackathon' && opportunity.participants}
                      {opportunity.type === 'course' && opportunity.enrolled}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deadline</span>
                    <span className="font-medium">
                      {new Date(opportunity.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted</span>
                    <span className="font-medium">
                      {new Date(opportunity.posted).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h4 className="text-md font-semibold text-gray-800 mb-4">Share This</h4>
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Twitter
                  </button>
                  <button className="flex-1 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;