"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search, ShieldCheck, FileText, ChevronRight } from "lucide-react";

interface Treatment {
  _id: string;
  name: string;
  description: string;
  category: string;
  isAyushmanCovered: boolean;
  coverageAmount: number;
  requiredDocuments: string[];
}

export default function SchemesPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/treatments");
      setTreatments(res.data.data);
    } catch (error) {
      console.error("Error fetching treatments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/treatments?search=${searchTerm}`);
      setTreatments(res.data.data);
    } catch (error) {
      console.error("Error searching treatments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Ayushman Bharat Schemes</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore covered treatments, check eligibility, and understand the benefits of the PM-JAY scheme.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for treatments (e.g., Knee Replacement, Cataract)..."
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-l-4 border-blue-500 dark:border-blue-400 transition-colors">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Eligibility Check</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Find out if you are eligible for the Ayushman Bharat PM-JAY scheme using your mobile number or ration card.
            </p>
            <a href="https://mera.pmjay.gov.in/search/login" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center">
              Check Now <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-l-4 border-green-500 dark:border-green-400 transition-colors">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Coverage Details</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get coverage up to ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.
            </p>
            <button className="text-green-600 dark:text-green-400 font-medium hover:underline flex items-center">
              Learn More <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-l-4 border-purple-500 dark:border-purple-400 transition-colors">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Required Documents</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Aadhar Card, Ration Card, or any government-issued ID is required to avail the benefits.
            </p>
            <button className="text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center">
              View List <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Treatments List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Covered Treatments</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {treatments.map((treatment) => (
                <div key={treatment._id} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border dark:border-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{treatment.name}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md mt-1 inline-block">
                        {treatment.category}
                      </span>
                    </div>
                    {treatment.isAyushmanCovered && (
                      <ShieldCheck className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{treatment.description}</p>
                  <div className="flex items-center justify-between border-t dark:border-gray-800 pt-4">
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Coverage: </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {treatment.coverageAmount > 0 ? `Up to ₹${treatment.coverageAmount.toLocaleString()}` : "Full Coverage"}
                      </span>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && treatments.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-xl shadow-sm border dark:border-gray-800">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-xl">No treatments found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
