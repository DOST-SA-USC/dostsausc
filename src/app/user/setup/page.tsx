import React from "react";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";
import { fetchData } from "@/lib/db";

import { ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import SetUpForm from "./components/SetUpForm";

export default async function Profile() {
  const user = await currentUser();
  if (!user) return null;

  const data = await fetchData(user.id);

  if (data) {
    redirect("/user");
  }

  return (
    <div className="w-full h-screen flex  justify-center items-start md:items-center p-4 md:p-8">
      <Card className="w-[600px] h-auto">
        <CardHeader>
          <CardTitle className="font-primary font-extrabold text-2xl">
            <Button className="self-start" variant="outline">
              <ArrowLeft />
              Go Back
            </Button>

            <h1 className="mt-2">Set Up Your Scholar ID</h1>
          </CardTitle>
          <CardDescription>
            Let&apos;s get you started. Fill out the form below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {user && <SetUpForm userID={user.id} />}
        </CardContent>
        <CardFooter className="text-sm">
          <p>© 2025, DOST SA USC. All Rights Reserved.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
