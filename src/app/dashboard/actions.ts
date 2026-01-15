"use server";

import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { TaskSchema } from "@/lib/validations/task";
import { getServerSession } from "next-auth"; // or your auth provider helper
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  const session = await getServerSession();
  
  // Note: Depending on how we set up auth options, session might need passing authOptions
  // For now, if session is null, we assume unauthorized.
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"), 
  };

  // Server-side Validation
  const validatedData = TaskSchema.parse(rawData);

  await connectDB();
  
  await Task.create({
    ...validatedData,
    assignedTo: (session.user).id, 
    // We need a dummy project ID for now since our Schema requires it
    // In a real app, you'd select the project from the UI
    project: (session.user).id // Temporary: assigning project to user ID just to satisfy Schema
  });

  revalidatePath("/dashboard"); 
}
