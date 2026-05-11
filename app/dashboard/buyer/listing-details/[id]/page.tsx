import { getListingByIdAction } from "@/app/actions/getListingById";
import ChatButton from "./chatButton";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getListingByIdAction(id);

  if (!result.success || !result.listing) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold text-lg">
        Listing not found
      </div>
    );
  }

  const listing = result.listing;

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* IMAGE */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img
              src={listing.images?.[0] || "/placeholder.jpg"}
              alt={listing.title}
              className="w-full h-[420px] object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {/* DETAILS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">
              {listing.title}
            </h1>

            <p className="text-3xl font-extrabold text-green-600 mt-3">
              Rs {listing.price}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                📍 {listing.city}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                📦 {listing.category}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                🕒 {new Date(listing.createdAt).toDateString()}
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* SELLER CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Seller Information
            </h2>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {listing.sellerId}
                </p>
                <p className="text-sm text-green-600">
                  ✔ Verified Seller
                </p>
              </div>
            </div>

            {/* CHAT BUTTON */}
            <ChatButton listingId={listing.id} />
          </div>

          {/* SAFETY NOTICE */}
          <div className="bg-yellow-50 border border-yellow-200 text-gray-700 p-4 rounded-2xl text-sm leading-relaxed">
            ⚠️ <span className="font-semibold">Safety Tip:</span> Never pay in advance. Always meet the seller in a safe public location.
          </div>
        </div>

      </div>
    </div>
  );
}