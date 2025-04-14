// pages/index.tsx or app/page.tsx (depending on your Next.js version)

import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <SignedIn>
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your recent expenses will appear here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your monthly spending summary will appear here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Budget Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your budget tracking will appear here.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}