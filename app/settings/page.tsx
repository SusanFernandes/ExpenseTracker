"use client";

import { useState } from "react";
import { UserProfile, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Bell } from "lucide-react";

export default function ProfilePage() {
  const [preferences, setPreferences] = useState({
    currency: "USD",
    darkMode: false,
    notifications: true,
    emailReports: true,
    budgetAlerts: true,
  });

  const [activeTab, setActiveTab] = useState("preferences");

  const handlePreferenceChange = (field, value) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleSavePreferences = () => {
    alert("Preferences saved successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>

      <div className="w-full">
        {/* Left Column - User Profile */}
        <div className="md:col-span-8 p-4">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfile
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none p-4",
                    navbar: "hidden",
                    pageScrollBox: "p-4",
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>{" "}
      </div>
    </div>
  );
}
