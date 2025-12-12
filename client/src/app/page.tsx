import Link from "next/link";
import { Search, MapPin, ShieldCheck, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Health, Our Priority. <br />
                <span className="text-blue-200">Simplified.</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Discover Ayushman Bharat covered treatments, find nearby hospitals, and get affordable stays with ArogyaShayak.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/hospitals">
                  <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-colors w-full sm:w-auto">
                    Find Hospitals
                  </button>
                </Link>
                <Link href="/schemes">
                  <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors w-full sm:w-auto">
                    Check Eligibility
                  </button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Placeholder for Hero Image */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/20 p-4 rounded-lg">
                    <Search className="text-white h-8 w-8" />
                    <div>
                      <p className="font-semibold">Smart Search</p>
                      <p className="text-sm text-blue-100">Find treatments instantly</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/20 p-4 rounded-lg">
                    <MapPin className="text-white h-8 w-8" />
                    <div>
                      <p className="font-semibold">Nearby Care</p>
                      <p className="text-sm text-blue-100">Locate hospitals close to you</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/20 p-4 rounded-lg">
                    <ShieldCheck className="text-white h-8 w-8" />
                    <div>
                      <p className="font-semibold">Ayushman Bharat</p>
                      <p className="text-sm text-blue-100">Verified scheme coverage</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose ArogyaShayak?</h2>
            <p className="mt-4 text-gray-600">Comprehensive healthcare assistance at your fingertips.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Geo-Based Discovery</h3>
              <p className="text-gray-600">
                Find hospitals and clinics based on your current location with real-time navigation support.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="text-green-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Scheme Guidance</h3>
              <p className="text-gray-600">
                Check your eligibility for Ayushman Bharat and other government health schemes easily.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Activity className="text-purple-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Health Assistant</h3>
              <p className="text-gray-600">
                Get instant answers to your health queries and treatment recommendations from our smart chatbot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to simplify your healthcare journey?</h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust ArogyaShayak for their medical needs. Sign up today and get access to exclusive benefits.
          </p>
          <Link href="/auth/signup">
            <button className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
