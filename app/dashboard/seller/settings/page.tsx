"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/logout";

type Tab = "account" | "security";

export default function SettingsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("account");

  const handleLogout = async() => {
   const res=await logout()
   if(res.success){
    router.push("/")
    router.refresh();
   }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* TOP BAR */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 hover:text-gray-900"
          title="Go back"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-600">Manage your account and security preferences</p>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

        {/* LEFT SETTINGS SIDEBAR */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4 md:p-6 overflow-y-auto shadow-sm md:shadow-sm">

          <h2 className="text-gray-900 font-bold text-lg mb-6">
            Menu
          </h2>

          <nav className="space-y-3">

            <button
              onClick={() => setTab("account")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                tab === "account"
                  ? "bg-gradient-to-r from-[#1F7A3F] to-[#186a35] text-white shadow-md scale-105"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <span>Account</span>
            </button>

            <button
              onClick={() => setTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                tab === "security"
                  ? "bg-gradient-to-r from-[#1F7A3F] to-[#186a35] text-white shadow-md scale-105"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Security</span>
            </button>

          </nav>
        </aside>

        {/* RIGHT CONTENT PANEL */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-white md:bg-transparent">

          {/* ACCOUNT PANEL */}
          {tab === "account" && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

                <div className="pb-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Account Settings
                  </h2>
                  <p className="text-gray-600 text-sm">Update your profile and manage your account preferences</p>
                </div>

                <div className="space-y-4">
                  <button className="w-full group flex items-center justify-between px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-[#1F7A3F] hover:bg-green-50 transition-all duration-200">
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg group-hover:from-[#1F7A3F]/20 group-hover:to-[#1F7A3F]/10 transition">
                        <svg className="w-6 h-6 text-blue-600 group-hover:text-[#1F7A3F]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Edit Profile Details</h3>
                        <p className="text-sm text-gray-600">Update your name, email, and profile picture</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#1F7A3F] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button className="w-full group flex items-center justify-between px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-[#1F7A3F] hover:bg-green-50 transition-all duration-200">
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg group-hover:from-[#1F7A3F]/20 group-hover:to-[#1F7A3F]/10 transition">
                        <svg className="w-6 h-6 text-purple-600 group-hover:text-[#1F7A3F]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Manage Listings Settings</h3>
                        <p className="text-sm text-gray-600">Configure your listing preferences and defaults</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#1F7A3F] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* SECURITY PANEL */}
          {tab === "security" && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

                <div className="pb-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Security Settings
                  </h2>
                  <p className="text-gray-600 text-sm">Protect your account with strong security settings</p>
                </div>

                <div className="space-y-4">
                  <button className="w-full group flex items-center justify-between px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-[#1F7A3F] hover:bg-green-50 transition-all duration-200">
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg group-hover:from-[#1F7A3F]/20 group-hover:to-[#1F7A3F]/10 transition">
                        <svg className="w-6 h-6 text-orange-600 group-hover:text-[#1F7A3F]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Reset Password</h3>
                        <p className="text-sm text-gray-600">Change your password to keep your account secure</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#1F7A3F] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* DANGER ZONE */}
                <div className="border-t-2 border-gray-200 pt-6 mt-6">

                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-red-600 font-bold text-lg">
                      Danger Zone
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">This action cannot be undone. Please be careful.</p>

                  <button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl hover:from-red-600 hover:to-red-700 font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4.5a1.5 1.5 0 011.5-1.5h10A1.5 1.5 0 0116 4.5v2a.5.5 0 01-.5.5H3.5a.5.5 0 01-.5-.5v-2zm14 7V4.5A2.5 2.5 0 0014.5 2h-10A2.5 2.5 0 002 4.5v10A2.5 2.5 0 004.5 17h10a2.5 2.5 0 002.5-2.5v-4.5a.5.5 0 00-.5-.5h-2.5a.5.5 0 00-.5.5v2.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2.5a.5.5 0 00-.5-.5H3.5a.5.5 0 00-.5.5v4.5z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>

                </div>

              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}