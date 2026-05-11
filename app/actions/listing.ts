"use server";

import { redirect } from "next/navigation";
import { createListing } from "../lib/services/listingService";

export async function createListingAction(formData: FormData) {
  try{
  const result = await createListing(formData);

  if (!result.success) {
    // Throw an error that the client can catch
   return result;
  }
  return {
      success: true,
      message: "Listing created successfully!",
    };


} catch (err) {
    console.error("Server Action err:", err);
    return {
      success: false,
      errors: { general: "Something went wrong. Try again later." },
    };
  }
  
}