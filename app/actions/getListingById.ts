import { prisma } from "../lib/prisma";



export async function getListingByIdAction(id:string){
    try{
    const listing=await prisma.listing.findUnique({
        where:{id},
        
    })
    if(!listing) return {success:false ,errors:{general:"Listing not found"}}
   console.log("ID RECEIVED:", id);
    return {success:true,listing}
    }
    catch(error){
    return{
        success:false,
        errors:{general:"Failed to fetch listing."}
    }
    }
}