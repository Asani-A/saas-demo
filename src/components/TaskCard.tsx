"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteTask, updateTaskStatus } from "@/app/dashboard/actions";
import { useTransition } from "react";
import { EditTaskDialog } from "./EditTaskDialog"; 
import { Pencil, Trash2, CheckCircle, Undo2 } from "lucide-react"; 

interface TaskProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    status: string;
    priority: string;
  };
}

export function TaskCard({ task }: TaskProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      startTransition(async () => {
        await deleteTask(task._id);
      });
    }
  };

  const toggleStatus = () => {
    const newStatus = task.status === "DONE" ? "TODO" : "DONE";
    startTransition(async () => {
      await updateTaskStatus(task._id, newStatus);
    });
  };

  // Determine color based on priority
  const priorityColor = {
    HIGH: "bg-red-100 text-red-800 border-red-200",
    MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-200",
    LOW: "bg-green-100 text-green-800 border-green-200",
  }[task.priority] || "bg-gray-100 text-gray-800";

  return (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
            <CardTitle className={`text-sm font-medium ${task.status === 'DONE' ? 'line-through text-gray-400' : ''}`}>
            {task.title}
            </CardTitle>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${priorityColor}`}>
          {task.priority}
        </span>
      </CardHeader>
      
      <CardContent>
        <p className="text-xs text-muted-foreground mb-4 min-h-[1.5rem]">
          {task.description || "No description provided."}
        </p>
        
        <div className="flex justify-end gap-2">
          {/* CRITICAL FIX: The EditTaskDialog MUST wrap the Edit Button.
             This acts as the "Trigger" for the modal.
          */}
          <EditTaskDialog task={task}>
            <Button variant="outline" size="sm" className="h-8 px-2">
               <Pencil className="w-3 h-3 mr-1" /> Edit
            </Button>
          </EditTaskDialog>
          
          <Button 
            variant={task.status === "DONE" ? "secondary" : "default"} 
            size="sm" 
            onClick={toggleStatus} 
            disabled={isPending}
            className="h-8 px-2"
          >
            {task.status === "DONE" ? <Undo2 className="w-3 h-3 mr-1"/> : <CheckCircle className="w-3 h-3 mr-1"/>}
            {task.status === "DONE" ? "Undo" : "Done"}
          </Button>
          
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleDelete} 
            disabled={isPending}
            className="h-8 px-2"
          >
            <Trash2 className="w-3 h-3 mr-1"/>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
