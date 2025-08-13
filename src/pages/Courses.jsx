import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  Search,
  Clock,
  Users,
  DollarSign,
  Star,
  BookOpen,
} from "lucide-react";
import { mockOpportunities } from "../data/mockData";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    level: "",
    price: "",
    duration: "",
    provider: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const courses = [
    ...mockOpportunities.filter((opp) => opp.type === "course"),
    {
      id: 1002,
      title: "Advanced Web Development Bootcamp",
      company: "freeCodeCamp",
      type: "course",
      location: "Online",
      duration: "20 weeks",
      description:
        "Master full-stack development with Node.js, React, and MongoDB through real-world projects.",
      requirements: ["JavaScript basics", "HTML/CSS"],
      deadline: "2025-10-05",
      posted: "2025-08-11",
      price: "Free",
      remote: true,
      trending: true,
      enrolled: 23000,
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 1003,
      title: "Practical Machine Learning Specialization",
      company: "Coursera",
      type: "course",
      location: "Online",
      duration: "12 weeks",
      description:
        "Gain hands-on experience building predictive models, tuning algorithms, and deploying ML systems in real-world applications.",
      requirements: ["Python", "Statistics basics", "Data Analysis"],
      deadline: "2025-09-30",
      posted: "2025-08-12",
      price: "49/month",
      remote: true,
      trending: true,
      enrolled: 18500,
      image:
        "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.requirements.some((req) =>
        req.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesProvider =
      !filters.provider ||
      course.company.toLowerCase().includes(filters.provider.toLowerCase());

    return matchesSearch && matchesProvider;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      level: "",
      price: "",
      duration: "",
      provider: "",
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
                Learning Courses
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredCourses.length} courses available
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
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
                  Level
                </label>
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange("level", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <select
                  value={filters.price}
                  onChange={(e) => handleFilterChange("price", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Prices</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provider
                </label>
                <input
                  type="text"
                  placeholder="e.g., Coursera"
                  value={filters.provider}
                  onChange={(e) =>
                    handleFilterChange("provider", e.target.value)
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
          {(showAll ? filteredCourses : filteredCourses.slice(0, 2)).map(
            (course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  {course.trending && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Trending
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Online
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-green-600 uppercase">
                      <BookOpen className="w-4 h-4 inline mr-1" />
                      {course.duration}
                    </span>
                    <span className="text-sm text-gray-500">
                      <Users className="w-4 h-4 inline mr-1" />
                      {course.enrolled} enrolled
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 mb-4">{course.company}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Self-paced learning</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>{course.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      <span>4.8 rating (2,450 reviews)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.requirements.slice(0, 4).map((req, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm"
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <Link
                    to={`/opportunity/${course.id}`}
                    className="w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition-colors block"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
        {filteredCourses.length > 2 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No courses found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filters to see all courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
