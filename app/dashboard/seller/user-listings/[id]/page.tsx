import { getListingByIdAction } from "@/app/actions/getListingById";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: Props) {
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
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">

      {/* 🔙 Back Button */}
      <Link
        href="/dashboard/seller/user-listings"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-8 text-sm font-medium transition"
      >
        ← Back to Listings
      </Link>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* 🖼 Image Section */}
        <div className="space-y-4">

          <div className="w-full h-[420px] rounded-2xl overflow-hidden shadow-md bg-white">
            <img
              src={listing.images?.[0] || "/placeholder.jpg"}
              alt={listing.title}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 flex-wrap">
            {listing.images?.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`image-${index}`}
                className="w-20 h-20 object-cover rounded-xl border border-gray-200 hover:scale-105 hover:shadow-md transition cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* 📄 Info Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col justify-between">

          {/* TOP INFO */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {listing.title}
            </h1>

            <p className="text-green-600 text-sm mt-2 font-semibold tracking-wide">
              {listing.category}
            </p>

            <p className="text-3xl font-extrabold text-gray-800 mt-4">
              PKR {listing.price}{" "}
              <span className="text-base font-medium text-gray-500">
                / {listing.unit}
              </span>
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                📦 Quantity: {listing.quantity}
              </span>

              <span className="bg-gray-100 px-3 py-1 rounded-full">
                🕒 {new Date(listing.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t my-6"></div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {listing.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* ACTION */}
          <div className="mt-8">
            <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-black transition shadow-sm">
              Share Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}