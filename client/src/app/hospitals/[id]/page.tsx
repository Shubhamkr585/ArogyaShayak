"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { MapPin, Phone, Globe, Star, CheckCircle, Clock } from "lucide-react";

interface Hospital {
  _id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  specialties: string[];
  rating: number;
  numReviews: number;
  contactNumber: string;
  website: string;
  isAyushmanEmpanelled: boolean;
  bedAvailability: {
    total: number;
    available: number;
    lastUpdated: string;
  };
}

export default function HospitalDetailPage() {
  const { id } = useParams();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchHospital();
    }
  }, [id]);

  const fetchHospital = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/hospitals/${id}`);
      setHospital(res.data);
    } catch (error) {
      console.error("Error fetching hospital:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Hospital not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="h-64 bg-gray-200 relative">
             {/* Placeholder for banner */}
             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <MapPin className="h-16 w-16" />
             </div>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hospital.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{hospital.address.street}, {hospital.address.city}, {hospital.address.state} - {hospital.address.zip}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-bold text-lg">{hospital.rating}</span>
                    <span className="text-gray-500 ml-1">({hospital.numReviews} reviews)</span>
                  </div>
                  {hospital.isAyushmanEmpanelled && (
                    <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Ayushman Empanelled
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Book Appointment
                </button>
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                  Get Directions
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3" />
                    <span>{hospital.contactNumber || "Not Available"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="h-5 w-5 mr-3" />
                    <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {hospital.website || "Not Available"}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Bed Availability</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total Beds</span>
                    <span className="font-semibold">{hospital.bedAvailability?.total || "N/A"}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Available</span>
                    <span className="font-bold text-green-600">{hospital.bedAvailability?.available || "N/A"}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Last updated: {hospital.bedAvailability?.lastUpdated ? new Date(hospital.bedAvailability.lastUpdated).toLocaleDateString() : "Unknown"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((spec, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
