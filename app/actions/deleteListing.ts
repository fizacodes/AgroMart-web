"use server"

import { getCurrentUser } from "../lib/getCurrentUser";
import { prisma } from "../lib/prisma";


export async function deleteListingAction(listingId:string){
    try{
        const user= await getCurrentUser()
        if(!user) return {success:false,errors:{general:"Not Signed In"}}

        const listing= await prisma.listing.findUnique({where:{id:listingId}})
        if(!listing) return{success:false,errors:{general:"Listing not found"}}
        if(listing.sellerId!== user.id) return{success:false,errors:{general:"Unauthorized"}}

        await prisma.listing.delete({where:{id:listingId}})
        return{success:true}
    }
    catch{
        return{
            success:false,
            error:{general:"Something went wrong.Try again later."}
        }
    }
}