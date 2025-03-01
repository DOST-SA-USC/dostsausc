"use client";
import React, { useState, memo } from "react";
import { useRouter } from "next/navigation";

import SaveDialog from "./SaveDialog";

import { useClerk } from "@clerk/nextjs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FilePenLine, Save, LogOut, LoaderCircle } from "lucide-react";

const ButtonGroup = ({ isIDSetUp }: { isIDSetUp: boolean }) => {
  const router = useRouter();

  const { signOut } = useClerk();
  const [logOutLoading, setLogOutLoading] = useState(false);

  const handleLogout = async () => {
    setLogOutLoading(true);
    await signOut().then(() => {
      setLogOutLoading(false);
      router.push("/");
    });
  };

  return (
    <div className="w-full flex justify-between">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" onClick={handleLogout} size="icon">
              {logOutLoading ? (
                <span className="animate-spin">
                  <LoaderCircle />
                </span>
              ) : (
                <LogOut />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Log Out</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={isIDSetUp ? "opacity-50 cursor-not-allowed" : ""}
                onClick={() => {
                  if (!isIDSetUp) {
                    router.push("/user/setup");
                  }
                }}
              >
                <FilePenLine /> {isIDSetUp ? "Edit" : "Set Up"}
              </Button>
            </TooltipTrigger>
            {isIDSetUp && (
              <TooltipContent>
                <p>
                  Contact <u>DOST SA USC</u> to edit ID.
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    onClick={(e) => {
                      if (!isIDSetUp) {
                        e.preventDefault(); // Prevent dialog from opening
                      }
                    }}
                    className={
                      !isIDSetUp ? "opacity-50 cursor-not-allowed" : ""
                    }
                  >
                    <Save /> Save
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              {!isIDSetUp && (
                <TooltipContent>
                  <p>Set Up ID first before saving.</p>
                </TooltipContent>
              )}
            </Tooltip>
            <SaveDialog />
          </Dialog>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default memo(ButtonGroup);
