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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import LoaderSpinner from "../loader/loader-spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { Progress } from "../ui/progress";

interface Town {
  name: string;
}

interface LGA {
  name: string;
}

interface State {
  name: string;
  state_code: string;
  capital: string;
  lgas: LGA[];
  towns: Town[];
}

type FileExtension =
  | "jpg"
  | "jpeg"
  | "png"
  | "gif"
  | "bmp"
  | "tiff"
  | "webp"
  | "svg"
  | "heif";

export function GeneralDetails() {
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;
  const updateAccount = useMutation(api.users.updateUser);

  const [formChanged, setFormChanged] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState(userProfile?.imageUrl as string);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl, {
    onUploadProgress: (progress: any) => setUploadProgress(progress),
  });

  const getFileUrl = useMutation(api.users.getUrl);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [firstName, setFirstName] = useState(userProfile?.firstName);
  const [lastName, setLastName] = useState(userProfile?.lastName);

  const [zipCode, setZipCode] = useState("");
  const [country] = useState("Nigeria");
  const [address, setAddress] = useState<string>("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("pick-up");

  const [states, setStates] = useState<State[]>([]);
  const [lgas, setLgas] = useState<LGA[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedLga, setSelectedLga] = useState<string>("");
  const [selectedTown, setSelectedTown] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const [emailAddress, setEmailAddress] = useState(userProfile?.email);
  const [phone, setPhone] = useState(userProfile?.phoneNumber);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || "");
      setLastName(userProfile.lastName || "");
      setEmailAddress(userProfile.email || "");
      setImageUrl(userProfile.imageUrl || "");
      setPhone(userProfile.phoneNumber);
    }
  }, [userProfile]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://nigeria-states-towns-lgas.onrender.com/api/all"
        );
        const data: State[] = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, [userId]);

  useEffect(() => {
    const fetchDetails = () => {
      const state = states.find((state) => state.state_code === selectedState);
      if (state) {
        if (state.lgas) {
          setLgas(state.lgas);
        } else {
          setLgas([]);
        }

        setCity(state.capital || "");

        if (state.towns) {
          setTowns(state.towns);
        } else {
          setTowns([]);
        }
      } else {
        setLgas([]);
        setCity("");
        setTowns([]);
      }
    };

    fetchDetails();
  }, [selectedState, states]);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setFormChanged(true);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setFormChanged(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value);
    setFormChanged(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(Number(e.target.value));
    setFormChanged(true);
  };

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getMimeType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() as
      | FileExtension
      | undefined;

    const mimeTypes: Record<FileExtension, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      bmp: "image/bmp",
      tiff: "image/tiff",
      webp: "image/webp",
      svg: "image/svg+xml",
      heif: "image/heif",
    };

    return mimeTypes[extension as FileExtension] || "application/octet-stream";
  };

  const uploadProfileImage = async (blob: Blob, fileName: string) => {
    setUploadingImage(true);
    setUploadProgress(0);
    try {
      const mimeType = getMimeType(fileName);
      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const fileUrl = await getFileUrl({ storageId });
      setImageUrl(fileUrl as string);
      setFormChanged(true);
      toast({
        title: "Success",
        description: "Profile image uploaded successfully!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error uploading file",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFile = async (file: File) => {
    setSelectedImage(file);
    const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));
    await uploadProfileImage(blob, file.name);
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    if (userProfile?.email !== emailAddress) {
      console.log("Email changed");
    }

    try {
      const formattedAddress = [
        address?.trim() || null,
        selectedLga?.trim() || null,
        selectedTown?.trim() || null,
        city?.trim() || null,
        selectedState ? capitalizeFirstLetter(selectedState) : null,
        country?.trim() || null,
        zipCode?.trim() || null,
      ]
        .filter((part) => part !== null)
        .join(", ")
        .replace(/(,\s?)+$/g, "");

      const finalAddress =
        formattedAddress === country?.trim()
          ? userProfile?.address
          : formattedAddress;

      await updateAccount({
        userId: profileId as Id<"users">,
        firstName,
        lastName,
        imageUrl: imageUrl || "",
        imageStorageId: imageStorageId !== null ? imageStorageId : undefined,
        email: emailAddress,
        phoneNumber: phone,
        address: finalAddress || userProfile?.address,
      });

      setFirstName(userProfile?.firstName);
      setLastName(userProfile?.lastName);
      setImageUrl(userProfile?.imageUrl as string);
      setEmailAddress(userProfile?.email);
      setPhone(userProfile?.phoneNumber);

      toast({
        title: "Success",
        description: "Profile has been updated successfully!",
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
    <>
      {isLoading ? (
        <div className="flex h-72 items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <>
          {/** Desktop view */}
          <div className="hidden sm:block">
            <div className="flex mt-6 justify-between items-start">
              <div
                className="flex items-start space-x-4"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const files = e.dataTransfer.files;
                  if (files.length > 0) {
                    const file = files[0];
                    handleFile(file);
                  }
                }}
              >
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id="avatar-upload"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFile(file);
                      }
                    }}
                  />
                  <Avatar className="w-16 h-16 cursor-pointer">
                    {selectedImage ? (
                      <AvatarImage
                        src={URL.createObjectURL(selectedImage)}
                        alt="User photo"
                        className="object-cover"
                      />
                    ) : userProfile?.imageUrl ? (
                      <AvatarImage
                        src={userProfile?.imageUrl}
                        alt="User photo"
                        className="object-cover"
                      />
                    ) : (
                      <AvatarImage
                        src="/images/placeholder.svg"
                        alt="User photo"
                        className="object-cover"
                      />
                    )}
                  </Avatar>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-sm text-[#6445E8] mt-4 hover:underline">
                    Change profile picture
                  </p>
                </div>
              </div>

              {formChanged === true ? (
                <Button
                  onClick={handleUpdate}
                  disabled={isLoading || uploadingImage}
                  className="bg-[#6445E8] px-12"
                >
                  {isLoading ? (
                    <Loader size={20} className="animate-spin ml-2" />
                  ) : (
                    "Update"
                  )}
                </Button>
              ) : null}
            </div>
            <div className="relative w-full mt-2">
              {uploadingImage && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Uploading image...
                  </p>
                  <Progress value={uploadProgress} className="mt-1" />
                </>
              )}
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <div className="mt-0">
                  <Label className="text-sm">First Name</Label>
                  <p className="text-xs text-muted-foreground">
                    This will be displayed on your profile
                  </p>
                </div>
                <div className="mt-5">
                  <Label className="text-sm">Last Name</Label>
                  <p className="text-xs text-muted-foreground">
                    This will be displayed on your profile
                  </p>
                </div>
                <div className="mt-5">
                  <Label className="text-sm">Email address</Label>
                  <p className="text-xs text-muted-foreground">
                    To change your email address, contact our support team
                  </p>
                </div>
                <div className="mt-5">
                  <Label className="text-sm">Phone number</Label>
                  <p className="text-xs text-muted-foreground">
                    This is the phone number saved to your account
                  </p>
                </div>
                <div className="mt-5">
                  <Label className="text-sm">Delivery address</Label>
                  <p className="text-xs text-muted-foreground">
                    This address will be used to deliver your gadgets
                  </p>
                </div>
              </div>
              <div>
                <div className="mt-0">
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="mt-5">
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                </div>
                <div className="mt-5">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={emailAddress}
                    onChange={handleEmailChange}
                    disabled
                  />
                </div>
                <div className="mt-5">
                  <Input
                    id="phone"
                    type="text"
                    placeholder="+2341234567890"
                    onChange={handlePhoneChange}
                    value={phone}
                  />
                </div>
                <div className="grid gap-6 mt-5">
                  <div className="grid gap-2">
                    {userProfile?.address && userProfile?.address ? (
                      <Label htmlFor="address">
                        Saved Address:{" "}
                        <span className="text-[#6445E8] text-sm italic">
                          ({userProfile?.address})
                        </span>
                      </Label>
                    ) : (
                      <Label htmlFor="address">
                        Address (
                        <span className="text-muted-foreground text-sm italic">
                          must include apartment number if any
                        </span>
                        )
                      </Label>
                    )}

                    <Input
                      id="address"
                      placeholder="Enter new address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setFormChanged(true);
                      }}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={selectedState}
                        onValueChange={(value) => {
                          setSelectedState(value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>States</SelectLabel>
                            {states.map((state) => (
                              <SelectItem
                                key={state.state_code}
                                value={state.state_code}
                              >
                                {state.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="city">Capital</Label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="City/Capital"
                        value={city}
                        readOnly
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="town">
                        Town{" "}
                        <span className="text-xs text-muted-foreground italic">
                          (optional)
                        </span>
                      </Label>
                      <Select
                        value={selectedTown}
                        onValueChange={setSelectedTown}
                        disabled={!Array.isArray(towns) || towns.length === 0}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              towns.length ? "Select a town" : "Select a town"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Towns</SelectLabel>
                            {towns.map((town) => (
                              <SelectItem key={town.name} value={town.name}>
                                {town.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="city">
                        LGA{" "}
                        <span className="text-xs text-muted-foreground italic">
                          (optional)
                        </span>
                      </Label>
                      <Select
                        value={selectedLga}
                        onValueChange={setSelectedLga}
                        disabled={!Array.isArray(lgas) || lgas.length === 0}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              lgas.length
                                ? "Select your lga"
                                : "Select your lga"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>LGAs</SelectLabel>
                            {lgas.map((lga) => (
                              <SelectItem key={lga.name} value={lga.name}>
                                {lga.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/** 
                        <div className="grid gap-2">
                          <Label htmlFor="zipCode">ZipCode/Postal Code</Label>
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
                        */}
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
              </div>
            </div>
          </div>

          {/** Mobile view */}
          <div className="sm:hidden mt-6">
            <div className="flex mt-6 justify-between items-start">
              <div
                className="flex items-start space-x-4"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const files = e.dataTransfer.files;
                  if (files.length > 0) {
                    const file = files[0];
                    handleFile(file);
                  }
                }}
              >
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id="avatar-upload"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFile(file);
                      }
                    }}
                  />
                  <Avatar className="w-16 h-16 cursor-pointer">
                    {selectedImage ? (
                      <AvatarImage
                        src={URL.createObjectURL(selectedImage)}
                        alt="User photo"
                        className="object-cover"
                      />
                    ) : userProfile?.imageUrl ? (
                      <AvatarImage
                        src={userProfile?.imageUrl}
                        alt="User photo"
                        className="object-cover"
                      />
                    ) : (
                      <AvatarImage
                        src="/images/placeholder.svg"
                        alt="User photo"
                        className="object-cover"
                      />
                    )}
                  </Avatar>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-sm text-[#6445E8] mt-4 hover:underline">
                    Change profile picture
                  </p>
                </div>
              </div>
              {formChanged === true ? (
                <Button
                  onClick={handleUpdate}
                  disabled={isLoading || uploadingImage}
                  className="bg-[#6445E8] px-5"
                >
                  {isLoading ? (
                    <Loader size={20} className="animate-spin ml-2" />
                  ) : (
                    "Update"
                  )}
                </Button>
              ) : null}
            </div>

            <div className="relative w-full mt-2">
              {uploadingImage && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Uploading image...
                  </p>
                  <Progress value={uploadProgress} className="mt-1" />
                </>
              )}
            </div>

            <div className="w-full mt-10">
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
                <Label htmlFor="email">
                  Email Address{" "}
                  <span className="text-muted-foreground text-sm italic">
                    (to change your email address, contact our support team)
                  </span>
                </Label>
                <Input
                  id="email"
                  className="w-full p-2 mt-1 border rounded-md"
                  placeholder="Enter your email address"
                  value={emailAddress}
                  onChange={handleEmailChange}
                  disabled
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
                  {userProfile?.address && userProfile?.address ? (
                    <Label htmlFor="address">
                      Saved Address: (
                      <span className="text-[#6445E8] text-sm italic">
                        {userProfile?.address}
                      </span>
                      )
                    </Label>
                  ) : (
                    <Label htmlFor="address">
                      Address{" "}
                      <span className="text-muted-foreground text-sm italic">
                        (must include apartment number if any)
                      </span>
                    </Label>
                  )}
                  <Input
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setFormChanged(true);
                    }}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={selectedState}
                      onValueChange={(value) => {
                        setSelectedState(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>States</SelectLabel>
                          {states.map((state) => (
                            <SelectItem
                              key={state.state_code}
                              value={state.state_code}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="city">Capital</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="City/Capital"
                      value={city}
                      readOnly
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="town">
                      Town{" "}
                      <span className="text-xs text-muted-foreground italic">
                        (optional)
                      </span>
                    </Label>
                    <Select
                      value={selectedTown}
                      onValueChange={setSelectedTown}
                      disabled={!Array.isArray(towns) || towns.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            towns.length ? "Select a town" : "Select a town"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Towns</SelectLabel>
                          {towns.map((town) => (
                            <SelectItem key={town.name} value={town.name}>
                              {town.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="city">
                      LGA{" "}
                      <span className="text-xs text-muted-foreground italic">
                        (optional)
                      </span>
                    </Label>
                    <Select
                      value={selectedLga}
                      onValueChange={setSelectedLga}
                      disabled={!Array.isArray(lgas) || lgas.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            lgas.length ? "Select your lga" : "Select your lga"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>LGAs</SelectLabel>
                          {lgas.map((lga) => (
                            <SelectItem key={lga.name} value={lga.name}>
                              {lga.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/** 
                        <div className="grid gap-2">
                          <Label htmlFor="zipCode">ZipCode/Postal Code</Label>
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
                        */}
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
            </div>
          </div>
        </>
      )}
    </>
  );
};