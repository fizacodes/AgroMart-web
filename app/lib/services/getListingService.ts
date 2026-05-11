// app/lib/services/listingService.ts
import { prisma } from "../prisma";
import { getCurrentUser } from "../getCurrentUser";

export async function getUserListings() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      errors: { general: "You must be signed in to view your listings." },
    };
  }
  else{
  const listings = await prisma.listing.findMany({
    where: { sellerId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return {
    success: true,
    listings,
  };
}
}