"use server"
import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getCurrentUser(){
const cookieStore=await cookies();
const userId=cookieStore.get("userId")?.value;

if (!userId){
    return null;
}
const user =await prisma.user.findUnique({
  where:{id:userId},
  select:{
    id:true,
    name:true,
    email:true,
    role:true
  }
})
return user;
};