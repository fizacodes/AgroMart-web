import { signupSchema } from "../validators/signupSchema";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { loginSchema } from "../validators/loginSchema";
import { cookies } from "next/headers";

const SALT_ROUNDS = 10; // configurable

export type SignupResult =
  | { success: true }
  | { success: false; errors: Record<string, string> };
  export type loginResult =
  | { success: true }
  | { success: false; errors: Record<string, string> };

export async function signupUser(formData: FormData): Promise<SignupResult> {
  // 1️⃣ Extract data safely from FormData
  const data = {
    name: (formData.get("name") ?? "").toString().trim(),
    email: (formData.get("email") ?? "").toString().trim(),
    password: (formData.get("password") ?? "").toString(),
    role:["BUYER"]
  };

  // 2️⃣ Validate using Zod
  const result = signupSchema.safeParse(data);
  if (!result.success) {
    const flattened = result.error.flatten();
    const fieldErrors: Record<string, string> = Object.fromEntries(
      Object.entries(flattened.fieldErrors).map(([k, v]) => [k, v?.[0] || "Invalid value"])
    );

    return {
      success: false,
      errors: {
        ...fieldErrors,
        general: flattened.formErrors[0], // optional general error
      },
    };
  }

  // 3️⃣ Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: result.data.email }, // NO normalization
  });
  if (existingUser) {
    return { success: false, errors: { email: "Email already exists." } };
  }

  // 4️⃣ Hash password
  const hashedPassword = await bcrypt.hash(result.data.password, SALT_ROUNDS);

  // 5️⃣ Create user in database
  await prisma.user.create({
    data: {
      name: result.data.name,
      email: result.data.email, // as entered
      password: hashedPassword,
      role:["BUYER"],
    },
  });

  return { success: true };
}

export async function loginUser(formData:FormData):Promise<loginResult>{
  const data={
    email:(formData.get("email")??"").toString().trim(),
    password:(formData.get("password")??"").toString().trim()
  }

  const result=loginSchema.safeParse(data);
  if(!result.success){
    const flattened= result.error.flatten();
    const fieldErrors: Record<string, string> = Object.fromEntries(
      Object.entries(flattened.fieldErrors).map(([k, v]) => [k, v?.[0] || "Invalid value"])
    );
    return{
      success:false,
      errors:{
        ...fieldErrors,
        general:flattened.formErrors[0],
      }
    }

  }
  const user= await prisma.user.findUnique({
    where:{email:result.data.email}
  }
  )
  if(!user){
    return{
      success:false,
      errors:{
        email:"User not found.",
      }
    }
  }
  const isMatch=await bcrypt.compare(
    result.data.password,
    user.password
  )
  if(!isMatch){
    return{
      success:false,
      errors:{
        password:"Incorrect Password"
      }
    }
  }
  const cookieStore=await cookies()
  cookieStore.set("userId",user.id,{
  httpOnly:true,
  secure:true,
  sameSite:"strict",
  path:"/",
  })
  return{
    success:true
  }
}