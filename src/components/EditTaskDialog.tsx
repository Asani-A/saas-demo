"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "@/lib/validations/task";
import { updateTaskDetails } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

interface TaskProps {
  _id: string;
  title: string;
  description?: string;
  priority: string; // Or "LOW" | "MEDIUM" | "HIGH" if you want to be stricter
  status: string;
}

type TaskFormData = z.infer<typeof TaskSchema>;

export function EditTaskDialog({ task, children }: { task: TaskProps; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("priority", data.priority || "MEDIUM");

    await updateTaskDetails(task._id, formData);
    setOpen(false); // Close dialog on success
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input {...register("title")} />
          </div>
          <div>
            <Label>Description</Label>
            <Input {...register("description")} />
          </div>
          <div>
            <Label>Priority</Label>
            <Select 
              defaultValue={task.priority} 
              onValueChange={(val) => setValue("priority", val as "LOW" | "MEDIUM" | "HIGH")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
