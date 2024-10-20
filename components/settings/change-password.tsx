"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser, useAuth } from "@clerk/nextjs";
import LoaderSpinner from "../loader/loader-spinner";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
  const { user } = useUser();
  const { isLoaded } = useAuth();
  const { toast } = useToast();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // New state for toggling New Password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for toggling Confirm Password visibility

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match." });
      return;
    }

    if (!user) {
      toast({ title: "Error", description: "User is not logged in." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          userId: user.id,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: "Password updated successfully!",
        });
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to change password.",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !user) {
    return <LoaderSpinner />;
  }

  return (
    <div className="mt-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold">Change Password</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Please enter your new password and confirm it.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label htmlFor="new-password" className="block text-sm">
            New Password
          </label>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 p-2"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showNewPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm">
            Confirm New Password
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 p-2"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showConfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#6445E8] hover:bg-[#6445E8]/90 py-6 px-10 rounded-lg"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
};