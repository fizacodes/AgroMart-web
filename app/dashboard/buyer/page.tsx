"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { becomeSeller } from "@/app/actions/becomeSeller";

export default function BuyerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleBecomeSeller = async () => {
  setIsLoading(true);

  try {
    await becomeSeller(); // ✅ updates role in DB + redirects on server
  } catch (err) {
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
              <p className="text-gray-600 mt-1">Find and purchase fresh produce directly from farmers</p>
            </div>
            <button
              onClick={handleBecomeSeller}
              disabled={isLoading}
              className="bg-[#1F7A3F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#186a35] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Become a Seller"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Browse Crops Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-[#1F7A3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 ml-4">Browse Crops</h3>
            </div>
            <p className="text-gray-600 mb-4">Discover fresh produce from local farmers in your area.</p>
            <Link
              href="/dashboard/buyer/browse-crops"
              className="text-[#1F7A3F] font-semibold hover:text-[#186a35] transition duration-200"
            >
              Browse Now →
            </Link>
          </div>

         
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 ml-4">My Profile</h3>
            </div>
            <p className="text-gray-600 mb-4">Track your profile.</p>
            <Link
              href="/dashboard/buyer/profile"
              className="text-[#1F7A3F] font-semibold hover:text-[#186a35] transition duration-200"
            >
              View Profile →
            </Link>
          </div>

          {/* Messages Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 ml-4">Messages</h3>
            </div>
            <p className="text-gray-600 mb-4">Chat directly with farmers about your orders.</p>
            <Link
              href="/dashboard/buyer/inbox"
              className="text-[#1F7A3F] font-semibold hover:text-[#186a35] transition duration-200"
            >
              Open Messages →
            </Link>
          </div>

        </div>

        {/* Quick Stats
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1F7A3F] mb-2">0</div>
              <div className="text-gray-600">Active Orders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1F7A3F] mb-2">0</div>
              <div className="text-gray-600">Completed Orders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1F7A3F] mb-2">0</div>
              <div className="text-gray-600">Total Spent</div>
            </div>
          </div>
        </div> */}

        {/* Recent Activity */}
        {/* <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No recent activity yet</p>
            <p className="text-gray-400 mt-2">Start browsing crops to see your activity here</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}