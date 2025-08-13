import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  Search,
  MapPin,
  Calendar,
  Trophy,
  Users,
  Clock,
} from "lucide-react";
import { mockOpportunities } from "../data/mockData";

const Hackathons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    remote: "",
    duration: "",
    theme: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const hackathons = [
    ...mockOpportunities.filter((opp) => opp.type === "hackathon"),
    {
      id: 999,
      title: "Global AI Hackathon 2025",
      company: "OpenAI",
      type: "hackathon",
      location: "Online",
      duration: "48 hours",
      description:
        "A worldwide competition to develop innovative AI solutions for education, healthcare.",
      requirements: ["Python", "Machine Learning", "Deep Learning", "NLP"],
      deadline: "2025-09-15",
      posted: "2025-08-10",
      prizes: "$75,000 total",
      remote: true,
      trending: true,
      participants: 500,
      image: "./src/assets/16.jpg",
    },
  ];

  const filteredHackathons = hackathons.filter((hackathon) => {
    const matchesSearch =
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.requirements.some((req) =>
        req.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesLocation =
      !filters.location ||
      hackathon.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesRemote =
      !filters.remote ||
      (filters.remote === "remote" ? hackathon.remote : !hackathon.remote);

    return matchesSearch && matchesLocation && matchesRemote;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      remote: "",
      duration: "",
      theme: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-800">
                Hackathon Events
              </h1>
              <p className="text-gray-600 mt-2"></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., San Francisco"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select
                  value={filters.remote}
                  onChange={(e) => handleFilterChange("remote", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All</option>
                  <option value="remote">Virtual</option>
                  <option value="onsite">In-Person</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={filters.duration}
                  onChange={(e) =>
                    handleFilterChange("duration", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All</option>
                  <option value="24">24 hours</option>
                  <option value="48">48 hours</option>
                  <option value="72">72 hours</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(showAll ? filteredHackathons : filteredHackathons.slice(0, 2)).map(
            (hackathon) => (
              <div
                key={hackathon.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  {hackathon.trending && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Trending
                      </span>
                    </div>
                  )}
                  {hackathon.remote && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Virtual
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-purple-600 uppercase">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {hackathon.duration}
                    </span>
                    <span className="text-sm text-gray-500">
                      <Users className="w-4 h-4 inline mr-1" />
                      {hackathon.participants} participants
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {hackathon.title}
                  </h3>

                  <p className="text-gray-600 mb-4">{hackathon.company}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{hackathon.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Registration due:{" "}
                        {new Date(hackathon.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Trophy className="w-4 h-4 mr-2" />
                      <span>{hackathon.prizes}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hackathon.requirements.slice(0, 4).map((req, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm"
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {hackathon.description}
                  </p>

                  <Link
                    to={`/opportunity/${hackathon.id}`}
                    className="w-full bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700 transition-colors block"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
        {filteredHackathons.length > 2 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}

        {filteredHackathons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hackathons found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filters to see all hackathons
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
