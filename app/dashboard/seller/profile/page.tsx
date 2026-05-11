"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar"; // adjust path if needed
import { getCurrentUser } from "@/app/lib/getCurrentUser";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getCurrentUser();
      setUser(data);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-x-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 w-full p-4 md:p-6 pt-20 md:pt-6">

        {/* PROFILE CARD */}
        <div className="max-w-3xl mx-auto mt-4 md:mt-0">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6">

            {/* AVATAR */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white text-2xl font-bold shadow">
              {user?.name?.charAt(0)}
            </div>

            {/* INFO */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.name}
              </h1>

              <p className="text-gray-500">{user?.email}</p>

              <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                {user?.role}
              </span>
            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mt-6">

            <div className="bg-white p-5 rounded-xl shadow text-center">
              <p className="text-gray-500 text-sm">Account Status</p>
              <p className="text-green-600 font-bold">Active</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow text-center">
              <p className="text-gray-500 text-sm">Role</p>
              <p className="font-bold text-green-600">{user?.role}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow text-center">
              <p className="text-gray-500 text-sm">User ID</p>
              <p className="font-bold text-xs text-green-600">{user?.id}</p>
            </div>

          </div>

          {/* DETAILS */}
          <div className="bg-white mt-6 p-6 rounded-2xl shadow">
            <h2 className="text-lg font-bold mb-4 text-black">Profile Details</h2>

            <div className="space-y-3 text-gray-700">
              <p><span className="font-semibold">Name:</span> {user?.name}</p>
              <p><span className="font-semibold">Email:</span> {user?.email}</p>
              <p><span className="font-semibold">Role:</span> {user?.role}</p>
            </div>

                  </div>

        </div>
      </div>

    </div>
  );
}