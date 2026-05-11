"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/lib/getCurrentUser";
import { logout } from "@/app/actions/logout";
import {useRouter }from "next/navigation";

export default function ProfilePage() {
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
   const router= useRouter()
   const handleLogout = async() => {
     const res=await logout()
     if(res.success){
      router.push("/")
      router.refresh();
     }
    };
  return (
    <div className="min-h-screen flex bg-gray-100">


      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* PROFILE CARD */}
        <div className="max-w-3xl mx-auto">

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
         
         <div className="bg-white mt-6 p-6 rounded-2xl shadow">
             <button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl hover:from-red-600 hover:to-red-700 font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4.5a1.5 1.5 0 011.5-1.5h10A1.5 1.5 0 0116 4.5v2a.5.5 0 01-.5.5H3.5a.5.5 0 01-.5-.5v-2zm14 7V4.5A2.5 2.5 0 0014.5 2h-10A2.5 2.5 0 002 4.5v10A2.5 2.5 0 004.5 17h10a2.5 2.5 0 002.5-2.5v-4.5a.5.5 0 00-.5-.5h-2.5a.5.5 0 00-.5.5v2.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2.5a.5.5 0 00-.5-.5H3.5a.5.5 0 00-.5.5v4.5z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
         </div>
        </div>

      </div>

    </div>
  );
}