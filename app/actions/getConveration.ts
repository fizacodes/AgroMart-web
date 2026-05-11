"use server"
import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";

export async function getOrCreateConversation(listingId:string){
  try{
    const cookieStore= await cookies()
    const buyerId=cookieStore.get("userId")?.value;
    if(!buyerId){return {success:false,error:{general:"Unauthorized"}}}

    const listing=await prisma.listing.findUnique({
      where:{id:listingId},
    })
    if(!listing){
     return{
      success:false,
      error:{general:"Listing not found."}
     }
    }
    const sellerId=listing.sellerId;

    if(buyerId===sellerId){
      return{
        success:false,
        error:{general:"You cannot chat with yourself."}
      }
    }

    let  conversation= await prisma.conversation.findFirst({
      where:{
        buyerId,
        sellerId
      }
    })
    if(!conversation){
      conversation=await prisma.conversation.create({
        data:{
          buyerId,
          sellerId
        }                 
      })
    }
    return{
      success:true,
      conversationId:conversation.id
    }
  }
   catch(error){
    return{
      success:false,
      error:{general:"Something went wrong."}
    }
   }
}