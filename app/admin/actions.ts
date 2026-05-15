"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("ik_admin", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("ik_admin");
  redirect("/admin/login");
}

export async function updateEnquiryStatus(id: string, status: string) {
  const cookieStore = await cookies();
  const session = cookieStore.get("ik_admin");
  if (session?.value !== process.env.ADMIN_PASSWORD) throw new Error("Unauthorized");

  const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/enquiries");
}

export async function updateOrderStatus(id: string, status: string) {
  const cookieStore = await cookies();
  const session = cookieStore.get("ik_admin");
  if (session?.value !== process.env.ADMIN_PASSWORD) throw new Error("Unauthorized");

  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("ik_admin");
  if (session?.value !== process.env.ADMIN_PASSWORD) throw new Error("Unauthorized");
}

export async function uploadGalleryImage(formData: FormData) {
  await requireAdmin();

  const file = formData.get("file") as File;
  const caption = (formData.get("caption") as string).trim();
  const category = (formData.get("category") as string).trim() || "General";

  if (!file || file.size === 0) throw new Error("No file provided");
  if (file.size > 8 * 1024 * 1024) throw new Error("File must be under 8 MB");

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const storagePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(storagePath, buffer, { contentType: file.type, upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(storagePath);

  const { error: dbError } = await supabase.from("gallery").insert({
    storage_path: storagePath,
    url: urlData.publicUrl,
    caption,
    category,
  });

  if (dbError) {
    await supabase.storage.from("gallery").remove([storagePath]);
    throw new Error(dbError.message);
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryImage(id: string, storagePath: string) {
  await requireAdmin();

  await supabase.storage.from("gallery").remove([storagePath]);

  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function updateGalleryCaption(id: string, caption: string, category: string) {
  await requireAdmin();

  const { error } = await supabase.from("gallery").update({ caption, category }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
