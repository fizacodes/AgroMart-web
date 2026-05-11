import { getSellerListings } from "@/app/actions/getRecentListing";
import Sidebar from "./Sidebar";
import { FaPlus, FaList, FaEnvelope } from "react-icons/fa";
import { getCurrentUser } from "@/app/lib/getCurrentUser";

interface Listing {
  id: string | number;
  title: string;
  price: string;
  quantity:string;
  createdAt:string;
}

export default async function SellerDashboard() {

  const user =await getCurrentUser()
  const sellerId=user?.id

  if (!sellerId) {
  return <div>Please login first</div>;
}
  // 🔥 SERVER ACTION USED HERE
  const listings = await getSellerListings(sellerId);

  const recentListings: Listing[] = listings.map((item: any) => ({
    id: item.id,
    title: item.title,
    price: `₹${item.price}/kg`,
    quantity:item.quantity,
    createdAt: new Date(item.createdAt).toLocaleDateString()
  }));

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-6 pt-16 md:pt-0">

        {/* Header */}
        <div className="mb-6 md:mb-8 mt-4 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Seller Dashboard
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Welcome back! Here's what's happening with your farm products.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <h2 className="text-xl text-black font-semibold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/dashboard/seller/post"
              className="flex items-center justify-center gap-3 bg-green-600 text-white p-4 rounded-lg">
              <FaPlus />
              Post Listing
            </a>

            <a href="/dashboard/seller/user-listings"
              className="flex items-center justify-center gap-3 bg-blue-600 text-white p-4 rounded-lg">
              <FaList />
              Manage Listings
            </a>

            <a href="/dashboard/seller/messages"
              className="flex items-center justify-center gap-3 bg-purple-600 text-white p-4 rounded-lg">
              <FaEnvelope />
              Messages
            </a>
          </div>
        </div>

        {/* Recent Listings */}
          <h2 className="text-xl text-black font-semibold mb-4">
            Recent Listings
          </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
  <table className="w-full text-sm text-left">
    
    {/* HEADER */}
    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
      <tr>
        <th className="p-2 md:p-4">Product</th>
        <th className="p-2 md:p-4">Price</th>
        <th className="p-2 md:p-4">Quantity</th>
        <th className="p-2 md:p-4">Date Posted</th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody className="divide-y divide-gray-100">
      {recentListings.length === 0 ? (
        <tr>
          <td colSpan={4} className="text-center p-4 md:p-6 text-gray-500">
            No listings yet
          </td>
        </tr>
      ) : (
        recentListings.map((listing) => (
          <tr
            key={listing.id}
            className="hover:bg-gray-50 transition"
          >
            {/* Product */}
            <td className="p-2 md:p-4 font-medium text-gray-900">
              {listing.title}
            </td>

            {/* Price */}
            <td className="p-2 md:p-4 text-green-700 font-semibold">
              {listing.price}
            </td>

            {/* Quantity */}
            <td className="p-2 md:p-4 text-gray-700">
              {listing.quantity}
            </td>

            {/* Date */}
            <td className="p-2 md:p-4 text-gray-500">
              {listing.createdAt}
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
}