"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "@/lib/validations/task";
import { createTask } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

// Infer the type from the schema
type TaskFormData = z.infer<typeof TaskSchema>;

export function CreateTaskForm() {
  const [loading, setLoading] = useState(false);

  // We need 'setValue' to manually handle the Shadcn Select component
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      priority: "MEDIUM", // Default value
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("priority", data.priority || "MEDIUM");

      await createTask(formData);
      
      // Reset form and explicitly reset priority back to default
      reset(); 
      setValue("priority", "MEDIUM"); 
      
      // Optional: Replace alert with a Toast in the future
      // alert("Task created successfully!"); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-slate-200">
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input 
              id="title" 
              placeholder="e.g. Design Landing Page"
              {...register("title")} 
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>
          
          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input 
              id="description" 
              placeholder="What needs to be done?"
              {...register("description")} 
            />
          </div>

          {/* Priority Select */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select 
              onValueChange={(val) => setValue("priority", val as "LOW" | "MEDIUM" | "HIGH")} 
              defaultValue="MEDIUM"
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Add Task"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
