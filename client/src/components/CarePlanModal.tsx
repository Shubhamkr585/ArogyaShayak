"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { X, MapPin, Clock, IndianRupee, Bus, Home, Loader2 } from "lucide-react";

interface CarePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospitalName: string;
  hospitalAddress: string;
  hospitalLocation?: { lat: number; lng: number };
}

interface TravelEstimate {
  estimatedCost: string;
  estimatedTime: string;
  modes: string[];
  tips: string;
}

interface Accommodation {
  _id: string;
  name: string;
  pricePerNight: number;
  type: string;
}

export default function CarePlanModal({
  isOpen,
  onClose,
  hospitalName,
  hospitalAddress,
  hospitalLocation,
}: CarePlanModalProps) {
  const [origin, setOrigin] = useState("");
  const [loading, setLoading] = useState(false);
  const [travelEstimate, setTravelEstimate] = useState<TravelEstimate | null>(null);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [step, setStep] = useState(1);

  const fetchAccommodations = async () => {
    if (!hospitalLocation) return;
    try {
      // Fetch nearby accommodations (reuse existing API)
      const res = await axios.get(
        `http://localhost:5000/api/accommodations?lat=${hospitalLocation.lat}&lng=${hospitalLocation.lng}&distance=5`
      );
      // Take top 3 cheapest
      const sorted = res.data.data
        .sort((a: Accommodation, b: Accommodation) => a.pricePerNight - b.pricePerNight)
        .slice(0, 3);
      setAccommodations(sorted);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  const handlePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin) return;

    setLoading(true);
    try {
      // 1. Get Travel Estimate
      const travelRes = await axios.post("http://localhost:5000/api/chat/estimate-travel", {
        origin,
        destination: `${hospitalName}, ${hospitalAddress}`,
      });
      setTravelEstimate(travelRes.data);

      // 2. Get Accommodations
      await fetchAccommodations();

      setStep(2);
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Plan My Visit
          </h2>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Where are you traveling from?
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  We'll calculate travel costs and find stays near {hospitalName}.
                </p>
              </div>

              <form onSubmit={handlePlan} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your City / Location
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Patna, Bihar"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating Plan...
                    </>
                  ) : (
                    "Generate Care Plan"
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Travel Section */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                  <Bus className="h-5 w-5" /> Travel Estimate
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Cost</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      ₹{travelEstimate?.estimatedCost}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {travelEstimate?.estimatedTime}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 italic">
                  Tip: {travelEstimate?.tips}
                </p>
              </div>

              {/* Accommodation Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Home className="h-5 w-5 text-green-600" /> Nearby Affordable Stays
                </h3>
                {accommodations.length > 0 ? (
                  <div className="grid gap-4">
                    {accommodations.map((acc) => (
                      <div
                        key={acc._id}
                        className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{acc.name}</p>
                          <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                            {acc.type}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600 dark:text-green-400">
                            ₹{acc.pricePerNight}<span className="text-xs text-gray-500">/night</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            ₹{acc.pricePerNight * 3} for 3 days
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No listed accommodations found nearby.
                  </p>
                )}
              </div>

              {/* Total Estimate */}
              <div className="border-t dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-300">Total Estimated Trip Cost (Travel + 3 Days Stay)</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ~ ₹
                    {parseInt(travelEstimate?.estimatedCost.split("-")[0] || "0") +
                      (accommodations[0]?.pricePerNight || 0) * 3}
                    +
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  *Excludes medical treatment costs. Estimates only.
                </p>
              </div>
              
              <button
                onClick={() => setStep(1)}
                className="w-full py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
