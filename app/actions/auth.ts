"use server"

import { redirect } from "next/navigation";
import { signupUser, loginUser, type loginResult } from "../lib/services/authService";
import { getCurrentUser } from "../lib/getCurrentUser";

export async function signup(formData: FormData) {
  try {
    const result = await signupUser(formData);

    if (!result.success) {
      return result; // field-level errors returned here
    }
// redirect only if signup succeeded
  } catch (err) {
    console.error("Server Action err:", err);
    return {
      success: false,
      errors: { general: "Something went wrong. Try again later." },
    };
  }
  
    redirect("/auth/login"); 
}

export async function login(formData: FormData):Promise<loginResult> {
  const result = await loginUser(formData);

  if (!result.success) {
    return result;
  }

  const user = await getCurrentUser();

  // 🔥 SELLER first
  if (user?.role.includes("SELLER")) {
  redirect("/dashboard/seller");
} else if (user?.role.includes("BUYER")) {
  redirect("/dashboard/buyer");
}

return {
  success: false,
  errors:{message:"Invalid Value"}
};
}