import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function LandingPage() {
  const session = await getServerSession();

  // 1. Auto-redirect if logged in
  if (session) {
    redirect("/dashboard");
  }

  // 2. Render Marketing Page if not
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-6 h-14 flex items-center border-b">
        <div className="font-bold text-xl">TaskFlow</div>
        <div className="ml-auto flex gap-4">
          <Link href="/api/auth/signin">
             <Button>Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-slate-50">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
          Manage your team&apos;s work <br className="hidden md:inline" />
          <span className="text-blue-600">without the chaos.</span>
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl mb-8">
          The open-source task manager built for agile teams. 
          Streamline your workflow, track progress, and ship faster.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link href="/api/auth/signin">
            <Button size="lg" className="px-8">Get Started for Free</Button>
          </Link>
  	  <Link href="https://github.com/Asani-A/saas-demo" target="_blank">
          <Button size="lg" variant="outline">View Github Repo</Button>
	  </Link>
        </div>
        
        {/* Social Proof / Image Placeholder */}
        <div className="mt-12 w-full max-w-4xl border rounded-xl shadow-2xl overflow-hidden">
           {/* Will replace this with a screenshot of your dashboard later */}
           <div className="bg-white h-64 md:h-96 flex items-center justify-center text-gray-300">
              Dashboard Preview Image
           </div>
        </div>
      </main>
    </div>
  );
}
