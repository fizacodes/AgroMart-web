"use server";
import { getUserListings } from "../lib/services/getListingService";

export async function fetchUserListingsAction() {
  try {
    return await getUserListings();
  } catch (err) {
    console.error("fetchUserListings error:", err);
    return { success: false, errors: { general: "Failed to fetch listings" } };
  }
}