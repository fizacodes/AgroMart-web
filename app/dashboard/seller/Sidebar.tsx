'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaList, FaPlus, FaEnvelope, FaChartLine, FaBell, FaUser, FaCog, FaBars, FaTimes } from 'react-icons/fa';

const sidebarItems = [
  { name: 'Dashboard', icon: <FaHome />, href: '/dashboard/seller' },
  { name: 'My Listings', icon: <FaList />, href: '/dashboard/seller/user-listings' },
  { name: 'Post New Listing', icon: <FaPlus />, href: '/dashboard/seller/post' },
  { name: 'Messages', icon: <FaEnvelope />, href: '/dashboard/seller/inbox' },
  { name: 'Profile', icon: <FaUser />, href: '/dashboard/seller/profile' },
  { name: 'Settings', icon: <FaCog />, href: '/dashboard/seller/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen bg-white shadow-md flex flex-col p-4">
        <h1 className="text-xl font-bold text-[#1F7A3F] mb-6">KhetConnect</h1>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-green-50 transition
              ${pathname === item.href ? 'bg-[#1F7A3F] text-white font-semibold' : 'text-gray-700'}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-2 right-2 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-[#1F7A3F] text-white p-2 rounded-md shadow-lg hover:bg-[#186a35] transition border border-white"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md flex flex-col p-4" onClick={(e) => e.stopPropagation()}>
            <h1 className="text-xl font-bold text-[#1F7A3F] mb-6">KhetConnect</h1>
            <nav className="flex flex-col gap-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-green-50 transition
                  ${pathname === item.href ? 'bg-[#1F7A3F] text-white font-semibold' : 'text-gray-700'}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}