"use server"
import { getCurrentUser } from "@/app/lib/getCurrentUser";

export async function getUserProfile() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  return user;
}