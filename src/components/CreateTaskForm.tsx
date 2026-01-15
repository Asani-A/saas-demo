"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "@/lib/validations/task";
import { createTask } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { z } from "zod"; // Add this import

// 1. Infer the type from the schema
type TaskFormData = z.infer<typeof TaskSchema>;

export function CreateTaskForm() {
  const [loading, setLoading] = useState(false);

  // 2. Pass the type to useForm
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
  });

  // 3. Now 'data' is strictly typed, no need for 'any'
  const onSubmit = async (data: TaskFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      // We know description is optional string, so we handle undefined
      formData.append("description", data.description || "");
      formData.append("priority", "MEDIUM");

      await createTask(formData);
      reset(); 
      alert("Task created successfully!"); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input 
              id="title" 
              placeholder="e.g. Design Landing Page"
              {...register("title")} 
            />
            {/* Fix the error message type casting */}
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input 
              id="description" 
              placeholder="What needs to be done?"
              {...register("description")} 
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Add Task"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
