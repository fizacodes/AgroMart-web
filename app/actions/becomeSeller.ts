"use server"

import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export async function becomeSeller() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedRoles = user.role.includes("SELLER")
    ? user.role
    : [...user.role, "SELLER"];

  await prisma.user.update({
    where: { id: userId },
    data: {
      role: updatedRoles,
    },
  });

  redirect("/dashboard/seller");
}