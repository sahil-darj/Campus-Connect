import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  Search,
  MapPin,
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";
import { mockOpportunities } from "../data/mockData";

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    remote: "",
    duration: "",
    company: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const internships = [
    ...mockOpportunities.filter((opp) => opp.type === "internship"),
    {
      id: 1001,
      title: "Frontend Developer Intern",
      company: "Netflix",
      type: "internship",
      location: "Los Angeles, CA",
      duration: "10 weeks",
      description:
        "Help build sleek, responsive interfaces for millions of global Netflix users.Collaborate with cross-functional teams to deliver seamless, high-performance user experiences at scale",
      requirements: ["HTML", "CSS", "JavaScript", "React"],
      deadline: "2025-09-20",
      posted: "2025-08-12",
      salary: "6,500/month",
      remote: true,
      trending: false,
      applicants: 310,
      image:
        "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.requirements.some((req) =>
        req.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesLocation =
      !filters.location ||
      internship.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
    const matchesRemote =
      !filters.remote ||
      (filters.remote === "remote" ? internship.remote : !internship.remote);
    const matchesCompany =
      !filters.company ||
      internship.company.toLowerCase().includes(filters.company.toLowerCase());

    return matchesSearch && matchesLocation && matchesRemote && matchesCompany;
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
      company: "",
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
                Internship Opportunities
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredInternships.length} internships available
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search internships..."
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
                  Work Type
                </label>
                <select
                  value={filters.remote}
                  onChange={(e) => handleFilterChange("remote", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="e.g., Google"
                  value={filters.company}
                  onChange={(e) =>
                    handleFilterChange("company", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
          {(showAll
            ? filteredInternships
            : filteredInternships.slice(0, 2)
          ).map((internship) => (
            <div
              key={internship.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={internship.image}
                  alt={internship.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                {internship.trending && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Trending
                    </span>
                  </div>
                )}
                {internship.remote && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Remote
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-600 uppercase">
                    {internship.duration}
                  </span>
                  <span className="text-sm text-gray-500">
                    <Users className="w-4 h-4 inline mr-1" />
                    {internship.applicants} applicants
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {internship.title}
                </h3>

                <p className="text-gray-600 mb-4">{internship.company}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      Due: {new Date(internship.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{internship.salary}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {internship.requirements.slice(0, 4).map((req, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {internship.description}
                </p>

                <Link
                  to={`/opportunity/${internship.id}`}
                  className="w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors block"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
        {filteredInternships.length > 2 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No internships found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filters to see all internships
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;
