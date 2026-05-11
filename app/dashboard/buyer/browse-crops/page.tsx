"use client";

import { useEffect, useState } from "react";
import { getListingUserPage } from "@/app/actions/getListingUserPage";
import Link from "next/link";

interface Province {
  province: string;
  cities: string[];
}

export default function BrowsePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [locations, setLocations] = useState<Province[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // ---------------- FETCH LISTINGS ----------------
  const fetchListings = async () => {
    setLoading(true);

    const data = await getListingUserPage({
      search,
      city,
      province,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });

    setListings(data || []);
    setLoading(false);
  };

  // ---------------- LOAD LOCATIONS (FIXED) ----------------
  useEffect(() => {
    const loadLocations = async () => {
      const res = await fetch("/data/pakistan-location.json");
      const data = await res.json();

      // ✅ FIX: extract ONLY valid provinces
      const provincesOnly: Province[] = data.cities.filter(
        (item: any) =>
          item &&
          typeof item === "object" &&
          item.province &&
          Array.isArray(item.cities)
      );

      setLocations(provincesOnly);
    };

    loadLocations();
    fetchListings();
  }, []);

  // ---------------- HANDLE PROVINCE CHANGE ----------------
  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setCity("");

    const found = locations.find((p) => p.province === value);
    setCities(found ? found.cities : []);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-6xl mx-auto">

        {/* ================= SEARCH BAR ================= */}
        <div className="bg-white p-4 rounded-2xl shadow flex flex-col sm:flex-row gap-3 text-black">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings..."
            className="flex-1 border rounded-xl px-4 py-2 text-black"
          />

          <div className="flex gap-3">
            <button
              onClick={fetchListings}
              className="bg-green-600 text-white px-6 rounded-xl"
            >
              Search
            </button>

            <button
              onClick={() => {
                setSearch("");
                setCity("");
                setProvince("");
                setMaxPrice("");
                setCities([]);
                fetchListings();
              }}
              className="bg-gray-200 text-black px-4 rounded-xl"
            >
              Show All
            </button>
          </div>
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="bg-white mt-4 p-4 rounded-2xl shadow flex flex-wrap gap-3 text-black">

          {/* PROVINCE DROPDOWN (FIXED) */}
          <select
            value={province}
            onChange={(e) => handleProvinceChange(e.target.value)}
            className="border px-3 py-2 rounded-lg text-black"
          >
            <option value="">All Provinces</option>

            {locations.map((p) => (
              <option key={p.province} value={p.province}>
                {p.province}
              </option>
            ))}
          </select>

          {/* CITY DROPDOWN (FIXED) */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border px-3 py-2 rounded-lg text-black"
          >
            <option value="">All Cities</option>

            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* PRICE */}
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
            className="border px-3 py-2 rounded-lg text-black"
          />

          <button
            onClick={fetchListings}
            className="bg-green-600 text-white px-6 rounded-lg"
          >
            Apply Filters
          </button>
        </div>

        {/* ================= LISTINGS ================= */}
        <div className="mt-6 text-black">

          <h1 className="text-xl font-bold mb-4">
            🌾 Browse Listings
          </h1>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : listings.length === 0 ? (
            <p className="text-gray-500">No listings found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {listings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={item.images?.[0]}
                    className="h-44 w-full object-cover"
                  />

                  <div className="p-4 text-black">

                    <h2 className="font-bold text-lg truncate">
                      {item.title}
                    </h2>

                    <p className="text-green-600 font-semibold">
                      Rs {item.price}
                    </p>

                    <p className="text-sm text-gray-600">
                      📍 {item.city}, {item.province}
                    </p>

                    <Link href={`/dashboard/buyer/listing-details/${item.id}`}>
                      <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl">
                        View Details
                      </button>
                    </Link>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}