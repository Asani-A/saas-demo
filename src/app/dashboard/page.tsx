import { CreateTaskForm } from "@/components/CreateTaskForm";

export default function DashboardPage() {
  return (
    <main className="container mx-auto p-10">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-8 text-slate-900">Workspace</h1>
        <CreateTaskForm />
      </div>
    </main>
  );
}
