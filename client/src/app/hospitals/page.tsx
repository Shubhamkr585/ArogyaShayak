"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Search, MapPin, Filter, Star } from "lucide-react";

interface Hospital {
  _id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  specialties: string[];
  rating: number;
  numReviews: number;
  isAyushmanEmpanelled: boolean;
}

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/hospitals");
      setHospitals(res.data.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/hospitals?name=${searchTerm}&specialty=${specialty}`);
      setHospitals(res.data.data);
    } catch (error) {
      console.error("Error searching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find Hospitals</h1>
          <div className="mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors">
              <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>Use My Location</span>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md mb-8 border dark:border-gray-800 transition-colors">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search hospitals, doctors, or treatments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="">All Specialties</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <Link href={`/hospitals/${hospital._id}`} key={hospital._id}>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden h-full flex flex-col border dark:border-gray-800">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
                    {/* Placeholder for hospital image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <MapPin className="h-12 w-12" />
                    </div>
                    {hospital.isAyushmanEmpanelled && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Ayushman Covered
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{hospital.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {hospital.address.street}, {hospital.address.city}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-bold text-gray-900 dark:text-white">{hospital.rating}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">({hospital.numReviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.slice(0, 3).map((spec, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md">
                          {spec}
                        </span>
                      ))}
                      {hospital.specialties.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                          +{hospital.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {!loading && hospitals.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-xl">No hospitals found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
