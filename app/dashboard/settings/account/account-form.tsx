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

export function AccountForm() {
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;
  const updateAccount = useMutation(api.users.updateUser);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [homeAddress, setHomeAddress] = useState(userProfile?.address);

  const [emailAddress, setEmailAddress] = useState(userProfile?.email);
  const [phone, setPhone] = useState(userProfile?.phoneNumber);

  const splitAddress = (fullAddress: string) => {
    const parts = fullAddress.split(", ");
    if (parts.length >= 4) {
      const addressParts = parts[0].trim().split(" ");
      const aptIndex = addressParts.findIndex((part) =>
        part.toLowerCase().includes("apt")
      );

      if (aptIndex !== -1) {
        setAddress(addressParts.slice(0, aptIndex).join(" ") || "");
        setAddress2(addressParts.slice(aptIndex).join(" ") || "");
      } else {
        setAddress(parts[0] || "");
        setAddress2("");
      }

      setCity(parts[1] || "");
      setState(parts[2] || "");

      const zipAndCountry = parts[3]?.split(" ");
      setZipCode(zipAndCountry[1] || "");
      setCountry(zipAndCountry[0] || "Nigeria");
    } else {
      console.warn("Invalid address format");
    }
  };

  useEffect(() => {
    if (userProfile) {
      setEmailAddress(userProfile.email || "");
      setPhone(userProfile.phoneNumber);
      if (userProfile.address) {
        splitAddress(userProfile.address);
      }
    }
  }, [userProfile]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(Number(e.target.value));
  };

  const handleAddressChange = () => {
    const formattedAddress = `${address} ${address2}, ${city}, ${state}, ${country} ${zipCode}`.trim();
    setHomeAddress(formattedAddress);
  };

  const handleUpdate = async () => {
    if (!homeAddress && !emailAddress && !phone) {
      toast({
        title:
          "Please enter either of the following (Address, Email, or Phone) to update",
      });
      return;
    }

    setIsLoading(true);

    try {
      await updateAccount({
        userId: profileId as Id<"users">,
        email: emailAddress,
        phoneNumber: phone,
        address: homeAddress,
      });

      setHomeAddress(userProfile?.address);
      setEmailAddress(userProfile?.email);
      setPhone(userProfile?.phoneNumber);

      toast({
        title: "Account information has been updated",
      });
    } catch (error) {
      console.error("Account update failed", error);
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
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          className="w-full p-2 mt-1 border rounded-md"
          placeholder="Enter your email address"
          value={emailAddress}
          onChange={handleEmailChange}
        />
      </div>
      <div className="mb-5 mt-3">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          className="w-full p-2 mt-1 border rounded-md"
          placeholder="+2341234567890"
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              handleAddressChange();
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address-2">Address 2 / Apt. Number</Label>
          <Input
            id="address-2"
            placeholder="Apt #"
            value={address2}
            onChange={(e) => {
              setAddress2(e.target.value);
              handleAddressChange();
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                handleAddressChange();
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State / Region</Label>
            <Input
              id="state"
              placeholder="State"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                handleAddressChange();
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="zipCode">ZipCode</Label>
            <Input
              id="zipCode"
              placeholder="ZipCode"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
                handleAddressChange();
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Nigeria"
              disabled
              value={country}
            />
          </div>
        </div>
      </div>
      <Button
        className="mt-4"
        onClick={handleUpdate}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader size={20} className="animate-spin ml-2" />
        ) : (
          "Update account"
        )}
      </Button>
    </div>
  );
};