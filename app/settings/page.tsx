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
        <UserButton />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Left Column - User Profile */}
        <div className="md:col-span-8">
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
                    card: "shadow-none p-0",
                    navbar: "hidden",
                    pageScrollBox: "p-0",
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preferences & Notifications */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex space-x-2 mb-2">
            <button
              onClick={() => setActiveTab("preferences")}
              className={`w-1/2 py-2 rounded ${
                activeTab === "preferences"
                  ? "bg-black text-white"
                  : "bg-gray-100"
              }`}
            >
              Preferences
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-1/2 py-2 rounded ${
                activeTab === "notifications"
                  ? "bg-black text-white"
                  : "bg-gray-100"
              }`}
            >
              Notifications
            </button>
          </div>

          {activeTab === "preferences" && (
            <Card>
              <CardHeader>
                <CardTitle>App Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <DollarSign size={16} />
                    Default Currency
                  </div>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) =>
                      handlePreferenceChange("currency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                      <SelectItem value="CAD">CAD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <input
                    type="checkbox"
                    checked={preferences.darkMode}
                    onChange={(e) =>
                      handlePreferenceChange("darkMode", e.target.checked)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences}>
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-lg font-medium">
                  <Bell size={16} className="mr-2" />
                  Notification Preferences
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Enable Notifications
                    </span>
                    <input
                      type="checkbox"
                      checked={preferences.notifications}
                      onChange={(e) =>
                        handlePreferenceChange(
                          "notifications",
                          e.target.checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email Reports</span>
                    <input
                      type="checkbox"
                      checked={preferences.emailReports}
                      onChange={(e) =>
                        handlePreferenceChange("emailReports", e.target.checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Budget Alerts</span>
                    <input
                      type="checkbox"
                      checked={preferences.budgetAlerts}
                      onChange={(e) =>
                        handlePreferenceChange("budgetAlerts", e.target.checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences}>
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
