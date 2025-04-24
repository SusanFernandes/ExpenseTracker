"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PieChart, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Expenses", href: "/expenses", icon: PieChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r">
      <div className="flex h-14 items-center border-b px-4">
        <h1 className="text-lg font-semibold">Expense Tracker</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === item.href && "bg-muted",
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
