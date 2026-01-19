import { CreateTaskForm } from "@/components/CreateTaskForm";
import { TaskCard } from "@/components/TaskCard";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getServerSession } from "next-auth";
import { UserNav } from "@/components/UserNav";

interface TaskDisplay {
  _id: string;
  title: string;
  status: string;
  priority: string;
  description?: string;
  assignedTo?: string; // or object if populated
  createdAt?: string;
}

// Helper to serialize Mongoose data
async function getTasks() {
  const session = await getServerSession();
  if (!session || !session.user) return [];

  await connectDB();

  // .lean() returns a plain JS object, faster and serializable
  const tasks = await Task.find({ assignedTo: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  // Convert _id to string to avoid serialization warnings
  return tasks.map(task => ({
    ...task,
    _id: task._id.toString(),
    // handle other ObjectId fields if necessary
  }));
}

export default async function DashboardPage() {
  const tasks = await getTasks();

  return (
    <main className="container mx-auto p-10">
    {/* Header Section */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold tracking-tight">TaskFlow Workspace</h1>
        <UserNav />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: The Form */}
        <div className="md:col-span-1">
          <h1 className="text-2xl font-bold mb-4">New Task</h1>
          <CreateTaskForm />
        </div>

        {/* Column 2 & 3: The Feed */}
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
          
          {tasks.length === 0 ? (
            <div className="text-center p-10 border-2 border-dashed rounded-lg text-gray-400">
              No tasks yet. Create one on the left!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {tasks.map((task: TaskDisplay) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
