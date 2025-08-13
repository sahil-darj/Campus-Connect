import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Calendar, Users, ArrowRight } from "lucide-react";
import { mockOpportunities, categories } from "../data/mockData";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const trendingOpportunities = mockOpportunities.filter((opp) => opp.trending);
  const recentOpportunities = mockOpportunities.slice(0, 3);

  const filteredOpportunities = mockOpportunities.filter(
    (opp) =>
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.requirements.some((req) =>
        req.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  const handleSearch = () => {
    const term = searchTerm.toLowerCase();

    if (term.includes("internship")) {
      navigate("/internships");
    } else if (term.includes("course")) {
      navigate("/courses");
    } else if (term.includes("hackathon")) {
      navigate("/hackathons");
    } else {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Gateway to
              <span className="text-yellow-300"> Tech Opportunities</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover internships, hackathons, and courses tailored for
              ambitious students
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search opportunities, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-full border-0 focus:ring-4 focus:ring-blue-300 text-gray-800"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">425+</div>
                <div className="text-blue-200">Active Opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-blue-200">Students Connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-blue-200">Partner Companies</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect opportunity to advance your career and skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/${category.name.toLowerCase()}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border hover:border-blue-200"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${category.color} mb-4`}
                  >
                    {category.count} opportunities
                  </p>
                  <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-800">
                    <span className="mr-2">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Opportunities */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                <TrendingUp className="inline w-8 h-8 text-orange-500 mr-2" />
                Trending Now
              </h2>
              <p className="text-gray-600">
                Hot opportunities students are applying to
              </p>
            </div>
            <Link
              to="/internships"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Trending
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-600 uppercase">
                      {opportunity.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {opportunity.type === "internship"
                        ? `${opportunity.applicants} applicants`
                        : opportunity.type === "hackathon"
                        ? `${opportunity.participants} participants`
                        : `${opportunity.enrolled} enrolled`}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {opportunity.title}
                  </h3>

                  <p className="text-gray-600 mb-4">{opportunity.company}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      Due: {new Date(opportunity.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {opportunity.requirements.slice(0, 3).map((req, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/opportunity/${opportunity.id}`}
                    className="w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors block"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Opportunities */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Recently Added
            </h2>
            <p className="text-gray-600">Fresh opportunities just posted</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {recentOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-purple-600 uppercase">
                    {opportunity.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(opportunity.posted).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {opportunity.title}
                </h3>

                <p className="text-gray-600 mb-4">{opportunity.company}</p>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{opportunity.location}</span>
                </div>

                <Link
                  to={`/opportunity/${opportunity.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
