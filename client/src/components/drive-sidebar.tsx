"use client";

import { useState } from "react";
import { Home, Users, Clock, Star, Trash2 } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/libs/utils";
import { NewFolder } from "@/components/drive-sidebar/new-folder";

const navigation = [
  { name: "My Drive", icon: Home, current: true },
  { name: "Shared with me", icon: Users, current: false },
  { name: "Recent", icon: Clock, current: false },
  { name: "Starred", icon: Star, current: false },
  { name: "Trash", icon: Trash2, current: false },
];

export function DriveSidebar() {
  const [currentNav, setCurrentNav] = useState("My Drive");

  return (
    <aside className="flex w-64 flex-col gap-4 border-r border-border bg-sidebar p-4">
      <NewFolder />
      <nav className="flex flex-col gap-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentNav === item.name;
          return (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
              onClick={() => setCurrentNav(item.name)}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
