"use server"

import { getCurrentUser } from "../lib/getCurrentUser";
import { prisma } from "../lib/prisma";
import { listingSchema } from "../lib/validators/listingSchema";



export async function updateListingAction(listingId:string, data:any){
    try{
     const user = await getCurrentUser();
     if(!user) return{success:false,errors:{general:"User not signed in."}}
     
     const listing=await prisma.listing.findUnique({where:{id:listingId}})
     if(!listing) return{success:false,errors:{general:"Listing not found"}}
     if(listing.sellerId !== user.id)  return {success:false,errors:{general:"Unauthorized"}}

      const parsed=listingSchema.safeParse(data);
      if(!parsed.success) {
        return {success:false,errors:{general:"Invalid data."}}
      }
      
      await prisma.listing.update(
        {
            where:{id:listingId},
            data:parsed.data
        }
      )
      return{
        success:true
      }
    }
    catch(err){
     return{
      success:false,
      error:{general:"Internal server error."}
     }
    }
}