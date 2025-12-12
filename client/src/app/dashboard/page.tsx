"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, FileText, Activity, Settings } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}
        </h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">My Profile</h3>
              <p className="text-sm text-gray-500">Manage your personal info</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Role:</span> {user.role}</p>
            <button className="mt-4 w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Saved Hospitals */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Saved Hospitals</h3>
              <p className="text-sm text-gray-500">Your bookmarked locations</p>
            </div>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>No hospitals saved yet.</p>
            <button className="mt-4 text-blue-600 hover:underline">
              Find Hospitals
            </button>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">My Documents</h3>
              <p className="text-sm text-gray-500">Prescriptions & Reports</p>
            </div>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>No documents uploaded.</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Upload Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
