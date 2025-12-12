"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Home, IndianRupee, Star } from "lucide-react";

interface Accommodation {
  _id: string;
  name: string;
  type: string;
  address: {
    street: string;
    city: string;
  };
  pricePerNight: number;
  rating: number;
  amenities: string[];
}

export default function StaysPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/accommodations");
      setAccommodations(res.data.data);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      let query = `http://localhost:5000/api/accommodations?`;
      if (type) query += `type=${type}&`;
      if (maxPrice) query += `maxPrice=${maxPrice}`;
      
      const res = await axios.get(query);
      setAccommodations(res.data.data);
    } catch (error) {
      console.error("Error filtering accommodations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Affordable Stays</h1>
          <div className="mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors">
              <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>Near Me</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md mb-8 border dark:border-gray-800 transition-colors">
          <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Dharamshala">Dharamshala</option>
                <option value="Hostel">Hostel</option>
                <option value="Guest House">Guest House</option>
                <option value="Hotel">Hotel</option>
              </select>
            </div>
            <div>
              <input
                type="number"
                placeholder="Max Price (₹)"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodations.map((acc) => (
              <div key={acc._id} className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border dark:border-gray-800">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <Home className="h-12 w-12" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-bold flex items-center text-gray-900 dark:text-white">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    {acc.pricePerNight}/night
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{acc.name}</h3>
                    <div className="flex items-center bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md">
                      <Star className="h-3 w-3 text-green-600 dark:text-green-400 fill-current mr-1" />
                      <span className="text-sm font-bold text-green-700 dark:text-green-400">{acc.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {acc.address.street}, {acc.address.city}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {acc.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && accommodations.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-xl">No accommodations found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
