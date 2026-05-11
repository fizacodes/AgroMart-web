import { prisma } from "../prisma";
import { listingSchema } from "../validators/listingSchema";
import { uploadFile } from "../cloudinary";
import { getCurrentUser } from "../getCurrentUser";

export async function createListing(formData: FormData) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        errors: { general: "You must be signed in to create a listing." },
      };
    }

    const basicData = {
      title: (formData.get("title") ?? "").toString().trim(),
      description: (formData.get("description") ?? "").toString().trim(),
      category: (formData.get("category") ?? "").toString().trim(),
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      unit: (formData.get("unit") ?? "").toString().trim(),
      province: (formData.get("province") ?? "").toString().trim(),
      city: (formData.get("city") ?? "").toString().trim(),
      sellerId: currentUser.id,
    };

    const imageEntries = formData.getAll("images");
    const imageFiles = imageEntries.filter((entry): entry is File => entry instanceof File);
    const rawVideo = formData.get("video");
    const videoFile = rawVideo instanceof File ? rawVideo : null;

    if (imageFiles.length === 0) {
      return {
        success: false,
        errors: { images: "At least one image is required" },
      };
    }

    const imageUrls: string[] = [];
    for (const file of imageFiles) {
      const uploaded = await uploadFile(file, "image");
      imageUrls.push(uploaded.secure_url);
    }

    let videoUrl: string | null = null;
    if (videoFile && videoFile.size > 0) {
      const uploadedVideo = await uploadFile(videoFile, "video");
      videoUrl = uploadedVideo.secure_url;
    }

    const listingData = {
      ...basicData,
      images: imageUrls,
      video: videoUrl ?? undefined,
    };

    const result = listingSchema.safeParse(listingData);
    if (!result.success) {
      const flattened = result.error.flatten();
      const fieldErrors: Record<string, string> = Object.fromEntries(
        Object.entries(flattened.fieldErrors).map(([k, v]) => [k, v?.[0] || "Invalid Value"])
      );

      return {
        success: false,
        errors: {
          ...fieldErrors,
          general: flattened.formErrors[0],
        },
      };
    }

    await prisma.listing.create({
      data: {
        ...result.data,
        sellerId: currentUser.id,
      },
    });

    return { success: true,
      message:"Listing created successfully."
    };

  } catch (err: any) {
    console.error("createListing error:", err);
    return {
      success: false,
      errors: { general: "Unable to create listing. Please try again." },
    };
  }
}
