"use client";

import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import UploadProfileImage from "@/components/uploadComponent/UploadProfileImage";

export function ProfileForm() {
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;
  const updateAccount = useMutation(api.users.updateUser);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState(userProfile?.imageUrl as string);
  const [firstName, setFirstName] = useState(userProfile?.firstName);
  const [lastName, setLastName] = useState(userProfile?.lastName);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || "");
      setLastName(userProfile.lastName || "");
      setImageUrl(userProfile.imageUrl || "");
    }
  }, [userProfile]);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleUpdate = async () => {
    if (!firstName && !lastName && !imageUrl) {
      toast({
        title:
          "Please enter either of the following (First name, Last name, or Profile picture) to update",
      });
      return;
    }

    setIsLoading(true);

    try {
      await updateAccount({
        userId: profileId as Id<"users">,
        firstName,
        lastName,
        imageUrl: imageUrl || "",
        imageStorageId: imageStorageId !== null ? imageStorageId : undefined,
      });

      setFirstName(userProfile?.firstName);
      setLastName(userProfile?.lastName);
      setImageUrl(userProfile?.imageUrl as string);

      toast({
        title: "Profile information has been updated",
      });
    } catch (error) {
      console.error("Profile update failed", error);
      toast({
        title: "Update unsuccessful",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          className="w-full p-2 mt-1 border rounded-md"
          placeholder="Enter your first name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="mb-5 mt-3">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          className="w-full p-2 mt-1 border rounded-md"
          placeholder="Enter your last name"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div>
        <Label htmlFor="response">Profile Picture</Label>
        <UploadProfileImage
          setImage={setImageUrl}
          setImageStorageId={setImageStorageId}
          image={imageUrl}
        />
      </div>
      <Button
        className="mt-4"
        onClick={handleUpdate}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader size={20} className="animate-spin ml-2" />
        ) : (
          "Update profile"
        )}
      </Button>
    </div>
  );
};