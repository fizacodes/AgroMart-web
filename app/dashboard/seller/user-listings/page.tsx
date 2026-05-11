"use client";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar"; // Make sure this path is correct
import { fetchUserListingsAction } from "../../../actions/getListing";
import { deleteListingAction } from "@/app/actions/deleteListing";
import { useRouter } from "next/navigation";

interface Listing {
  id: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  images: string[];
  createdAt: Date;
}

export default function UserListingsPage() {
  const [listings, setListings] = useState<Listing[] >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router=useRouter();
 
  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      const result = await fetchUserListingsAction();

      if (result.success) {
        setListings(result.listings || []);
      } else {
        setError(result.errors?.general || "Failed to load listings");
      }

      setLoading(false);
    }

    fetchListings();
  }, []);
      
    async function handleDelete(id:string){
      const confirmDelete=confirm("Are you sure you want to delete this listing?")
      if(!confirmDelete)return;
      try{
       const result=await deleteListingAction(id);
       if(result.success){
        setListings((prev)=>prev.filter((item)=>item.id !== id))
       }
       else{
        alert(result.errors?.general || "Failed to delete");
       }
      }
      catch{
         console.error(error);
         alert("Something went wrong.")
      }
    }
      
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-4 md:mt-0">My Listings</h1>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-[#1F7A3F] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && !loading && (
          <p className="text-red-500 font-medium text-center mt-8">{error}</p>
        )}

        {!loading && listings.length === 0 && !error && (
          <p className="text-gray-600 font-medium text-center mt-8">
            You have no listings yet.
          </p>
        )}

        {!loading && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    {listing.category}
                  </span>
                </div>

                {/* Info */}
                <h2  className="text-lg font-semibold text-gray-800 truncate">{listing.title}</h2>
                <p className="text-gray-600 mt-1">
                  PKR <span className="font-bold">{listing.price}</span> / {listing.unit}
                </p>
                <p className="text-gray-500 text-sm mt-1">Quantity: {listing.quantity}</p>
                <p className="text-gray-400 text-xs mt-2">
                  Posted on {new Date(listing.createdAt).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <button onClick={()=>router.push(`/dashboard/seller/user-listings/${listing.id}`)} className="flex-1 py-2 bg-gradient-to-r from-[#1F7A3F] to-[#186a35] text-white font-semibold rounded-lg hover:scale-105 transition">
                    View
                  </button>
                  <button onClick={()=>handleDelete(listing.id)} className="flex-1 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}