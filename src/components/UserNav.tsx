"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserNav() {
  const { data: session } = useSession();
  
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium">{session?.user?.name}</p>
        <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
      </div>
      <Avatar>
        <AvatarImage src={session?.user?.image || ""} />
        <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
      </Avatar>
      <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
        Sign Out
      </Button>
    </div>
  );
}
