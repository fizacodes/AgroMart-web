import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/getCurrentUser";


export default async function dashboardLayout({ children }: { children: React.ReactNode }){
  const user = await getCurrentUser();
  
  // if (user.role === "BUYER") redirect("/dashboard/buyer")
  return <>{children}</>;
}