"use client";

import { useState } from "react";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import {
  phoneBrands,
  tabletBrands,
  laptopBrands,
  desktopBrands,
  models,
} from "@/types/deviceTypes";
import { useQuery, useMutation, useAction } from "convex/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const serialNumberPatterns = {
  iphone: /^[A-Z0-9]{8,12}$/,
  samsung: /^[A-Z0-9]{11,17}$/i,
  google: /^[A-Z0-9]{7,15}$/,
  lg: /^[A-Z0-9]{7,15}$/,
  ipad: /^[A-Z0-9]{8,12}$/,
  samsungTablet: /^[A-Z0-9]{11,17}$/,
  amazonTablet: /^[A-Z0-9]{9,15}$/,
  asusTablet: /^[A-Z0-9]{9,15}$/,
  lenovoTablet: /^[A-Z0-9]{7,15}$/,
  lgTablet: /^[A-Z0-9]{7,15}$/,
  dellLaptop: /^[A-Z0-9]{7,15}$/,
  hpLaptop: /^[A-Z0-9]{7,15}$/,
  macbook: /^[A-Z0-9]{8,12}$/,
  imac: /^[A-Z0-9]{8,12}$/,
  dellDesktop: /^[A-Z0-9]{7,15}$/,
  hpDesktop: /^[A-Z0-9]{7,15}$/,
  microsoftTablet: /^[A-Z0-9]{12}$/,
};

type DeviceType = "phone" | "tablet" | "laptop" | "desktop";

type DeviceBrandId = keyof typeof serialNumberPatterns;

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

export function OnboardDevice() {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();

  const [showDialog, setShowDialog] = useState(false);
  const [imageFileUrl, setImageFileUrl] = useState<string>("");
  const [imageFileStorageId, setImageFileStorageId] =
    useState<Id<"_storage"> | null>(null);
  const [uploadingImageFile, setUploadingImageFile] = useState(false);

  const [deviceType, setDeviceType] = useState<DeviceType | "">("");
  const [deviceBrand, setDeviceBrand] = useState<string>("");
  const [deviceModel, setDeviceModel] = useState<string>("");
  const [modelInputVisible, setModelInputVisible] = useState(false);
  const [availableModels, setAvailableModels] = useState<any[]>([]);
  const [condition, setCondition] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedProtectionId, setSelectedProtectionId] = useState<
    Id<"deviceProtections"> | undefined
  >(undefined);
  const [selfieError, setSelfieError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSerialValid, setIsSerialValid] = useState(true);

  //Device Image
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [fileStorageId, setFileStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [deviceFileUrl, setDeviceFileUrl] = useState("");
  const [uploadingDeviceFile, setUploadingDeviceFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDeviceFile, setSelectedDeviceFile] = useState<File | null>(
    null
  );

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl, {
    onUploadProgress: (progress: any) => setUploadProgress(progress),
  });

  const getFileUrl = useMutation(api.devices.getUrl);

  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id as Id<"users">;

  const protections = useQuery(
    api.deviceProtections.getDeviceProtectionsByUserId,
    {
      userId: profileId,
    }
  );

  const onboardDevice = useMutation(api.devices.onboardDevice);

  const updateProtection = useMutation(
    api.deviceProtections.updateDeviceProtection
  );

  const activateFreePlan = useMutation(api.users.updateUser);

  const verifyUser = useMutation(api.users.verifyUserIdentity);

  const sendEmail = useAction(api.sendEmail.freePlanActivatedEmail);

  const sendSupportKYCEmail = useAction(api.sendEmail.userRequestKYCEmail);

  const sendUserKYCEmail = useAction(api.sendEmail.kycInitiatedEmail);

  const freeProtections = protections?.filter(
    (protection) =>
      protection.name === "Free Plan" &&
      protection?.activationDate?.trim() === ""
  );

  const basicProtections = protections?.filter(
    (protection) =>
      protection.name === "Basic Plan" &&
      protection?.activationDate?.trim() === ""
  );

  const proProtections = protections?.filter(
    (protection) =>
      protection.name === "Pro Plan" &&
      protection?.activationDate?.trim() === ""
  );

  const freeCount = freeProtections?.length || 0;
  const basicCount = basicProtections?.length || 0;
  const proCount = proProtections?.length || 0;

  const validateSerialNumber = (
    serialNumber: string,
    deviceBrand: DeviceBrandId
  ) => {
    const pattern = serialNumberPatterns[deviceBrand];
    if (!pattern) return false;
    return pattern.test(serialNumber);
  };

  const handleSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSerialNumber(value);
    if (deviceBrand) {
      setIsSerialValid(
        validateSerialNumber(value, deviceBrand.toLowerCase() as DeviceBrandId)
      );
    }
  };

  const handleCardClick = (protectionList: any, planName: string) => {
    if (protectionList.length > 0) {
      setSelectedPlan(planName);
      setSelectedProtectionId(protectionList[0]._id);
    }
  };

  const getBrandsForDevice = (device: string | undefined) => {
    switch (device) {
      case "phone":
        return phoneBrands;
      case "tablet":
        return tabletBrands;
      case "laptop":
        return laptopBrands;
      case "desktop":
        return desktopBrands;
      default:
        return [];
    }
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

  const uploadFile = async (blob: Blob, fileName: string) => {
    setUploadingDeviceFile(true);
    setUploadProgress(0);
    try {
      const mimeType = getMimeType(fileName);
      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setFileStorageId(storageId);

      const fileUrl = await getFileUrl({ storageId });
      setDeviceFileUrl(fileUrl as string);
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error uploading image",
        variant: "destructive",
      });
    } finally {
      setUploadingDeviceFile(false);
    }
  };

  const handleFile = async (file: File) => {
    try {
      setSelectedDeviceFile(file);
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      await uploadFile(blob, file.name);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeviceSelection = (deviceType: DeviceType) => {
    setDeviceType(deviceType);
    setDeviceBrand("");
    setDeviceModel("");
    setAvailableModels([]);
  };

  const handleBrandChange = (id: string) => {
    const brand = getBrandsForDevice(deviceType).find(
      (brand) => brand.id === id
    );

    if (brand) {
      setDeviceBrand(brand.label);

      if (brand.id === "other") {
        setAvailableModels([]);
        setModelInputVisible(true);
        setDeviceModel("");
      } else {
        setAvailableModels(models[id] || []);
        setModelInputVisible(false);
        setDeviceModel("");
      }

      setDeviceModel("");
    }
  };

  const handleModelChange = (id: string) => {
    const model = availableModels.find((model) => model.id === id);

    if (model) {
      setDeviceModel(model.label);
    } else {
      setDeviceModel("");
    }
  };

  const handleConditionChange = (value: string) => {
    setCondition(value);
  };

  const handleDeviceOnboard = async () => {
    try {
      setLoading(true);

      const { deviceId, plan } = await onboardDevice({
        protection: selectedProtectionId as Id<"deviceProtections">,
        planName: selectedPlan,
        type: deviceType,
        brand: deviceBrand,
        model: deviceModel,
        condition,
        serialNumber,
        imageUrl: deviceFileUrl || "",
        imageStorageId: fileStorageId !== null ? fileStorageId : undefined,
      });

      if (deviceId && plan) {
        const durationMilliseconds =
          plan.durationMonths * 30 * 24 * 60 * 60 * 1000;
        const currentDate = new Date();
        const expiryDate = new Date(
          currentDate.getMilliseconds() + durationMilliseconds
        );

        if (selectedPlan === "Free Plan") {
          await activateFreePlan({
            userId: userProfile?._id as Id<"users">,
            hasFreePlan: true,
            freePlanActivationDate: currentDate.toDateString(),
          });
        }

        await updateProtection({
          protectionId: selectedProtectionId as Id<"deviceProtections">,
          deviceId,
          amountLeft: plan.maxRedemptionAmount,
          claimsAvailable: plan.claimLimit,
          activationDate: currentDate.toDateString(),
          expiryDate: expiryDate.toDateString(),
        });

        if (selectedPlan === "Free Plan") {
          await sendEmail({
            emailAddress: userProfile?.email as string,
            firstName: userProfile?.firstName as string,
            device: deviceModel,
            duration: `${plan.durationMonths} months`,
            coverage: `N${plan.maxRedemptionAmount.toLocaleString()} - 1 device`,
            claimLimit: `${plan.claimLimit} claim`
          });
          toast({
            title: "Success",
            description: "Device onboarded, you will be redirected.",
          });
          router.push(`/protection/onboard/success/${deviceId}`);
        } else {
          toast({
            title: "Success",
            description:
              "Device onboarding initiated, you will be redirected to a verification screen.",
          });
          router.push(`/protection/onboard/verification/${deviceId}`);
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Device could not be onboarded.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImageFile = async (blob: Blob, fileName: string) => {
    setUploadingImageFile(true);
    setUploadProgress(0);
    try {
      const mimeType = getMimeType(fileName);
      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageFileStorageId(storageId);

      const fileUrl = await getFileUrl({ storageId });
      setImageFileUrl(fileUrl as string);
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading image",
        variant: "destructive",
      });
    } finally {
      setUploadingImageFile(false);
    }
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const handleImageFile = async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setSelfieError(true);
      return;
    }

    try {
      setSelectedImageFile(file);
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      await uploadImageFile(blob, file.name);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading image, try again.",
        variant: "destructive",
      });
    }
  };

  const handleVerifyUser = async () => {
    try {
      const response = await verifyUser({
        userId: userProfile?._id as Id<"users">,
        identityVerificationUrl: imageFileUrl,
        identityVerificationStorageId:
          imageFileStorageId !== null ? imageFileStorageId : undefined,
        verificationStatus: "pending",
      });

      if (response) {
        await sendSupportKYCEmail({
          emailAddress: userProfile?.email as string,
          firstName: userProfile?.firstName as string,
          lastName: userProfile?.lastName as string,
          imageFileUrl: imageFileUrl as string
        });

        await sendUserKYCEmail({
          emailAddress: userProfile?.email as string,
          firstName: userProfile?.firstName as string,
        });

        setShowDialog(false);
        toast({
          title: "Success",
          description:
            "Identity verification has begun, you will be notified via email once your profile has been verified successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error verifying your identity.",
        variant: "destructive",
      });
    }
  };

  const isDisabled =
    !userProfile?.identityVerificationUrl ||
    userProfile?.verificationStatus === "pending" ||
    userProfile?.verificationStatus === "failed";

  const renderVerificationMessage = () => {
    if (!userProfile?.identityVerificationUrl) {
      return (
        <div className="flex p-3 gap-8 justify-between items-start px-4 w-full bg-muted border border-b border-gray-200 sm:items-center shadow-md rounded-lg">
          <p className="text-xs sm:text-sm text-muted-foreground">
            You will need to verify your identity and complete KYC before you
            can onboard your device to Basic and Pro plans.
          </p>
          <Button
            onClick={() => setShowDialog(true)}
            className="py-4 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8]/90 hover:text-white"
          >
            Start verification
          </Button>
        </div>
      );
    }

    if (userProfile?.verificationStatus === "pending") {
      return (
        <div className="flex p-3 gap-8 justify-between items-start px-4 w-full bg-muted border border-b border-gray-200 sm:items-center shadow-md rounded-lg">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Verification has started and is currently in progress.
          </p>
        </div>
      );
    }

    if (userProfile?.verificationStatus === "failed") {
      return (
        <div className="flex p-3 gap-8 justify-between items-start px-4 w-full bg-muted border border-b border-gray-200 sm:items-center shadow-md rounded-lg">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Identity verification failed, please try again.
          </p>
          <Button
            onClick={() => setShowDialog(true)}
            className="py-4 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8]/90 hover:text-white"
          >
            Retry verification
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <></>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Verify your identity</DialogTitle>
                <DialogDescription className="flex items-start">
                  Identity verification is required to onboard a device to both
                  Basic and Pro plans.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-start space-y-1 mt-4">
                <Label className="text-sm font-medium text-gray-900">
                  Your picture holding identity card (2MB max)
                </Label>
                <div className="relative border rounded-lg p-3 w-full flex items-start justify-start cursor-pointer hover:bg-[#6445E8]/5">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    Upload here
                  </span>
                  <Input
                    id="identity-image"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageFile(file);
                    }}
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
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleImageFile(file);
                    }}
                  />
                </div>
                {!selectedImageFile && selfieError ? (
                  <span className="text-red-500 text-xs">
                    File size exceeds 2MB. Please upload a smaller file.
                  </span>
                ) : null}
                {uploadingImageFile ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Uploading picture...
                    </p>
                    <Progress value={uploadProgress} className="mt-1" />
                  </>
                ) : selectedImageFile ? (
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Uploaded: <strong>{selectedImageFile.name}</strong>
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="flex mt-2 ml-auto">
                <Button
                  onClick={handleVerifyUser}
                  disabled={!imageFileUrl}
                  className="mt-auto mr-4 ml-4 mb-4 inline-flex items-center gap-2 px-12 py-6 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white"
                >
                  Verify
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <main className="flex flex-1 mt-6 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {Boolean(basicCount || proCount) && renderVerificationMessage()}
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:gap-8">
              {freeCount !== 0 ? (
                <Card
                  className={`border-transparent shadow-md ${
                    selectedPlan === "Free Plan"
                      ? "bg-[#6445E8]/20"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handleCardClick(freeProtections, "Free Plan")}
                >
                  <CardContent className="pb-8 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg mt-2 mb-0.5 font-semibold">
                          Free plan
                        </h2>
                        {userProfile?.freePlanActivationDate ? (
                          <span className="text-sm text-muted-foreground">
                            Not available
                          </span>
                        ) : (
                          <span className="text-sm text-[#6445E8]">
                            {freeCount} available
                          </span>
                        )}
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center w-5 h-5 bg-red-500/20 rounded-full">
                              <span className="text-red-500 text-xs font-bold">
                                !
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {userProfile?.freePlanActivationDate ? (
                              <p className="text-muted-foreground">
                                Your free plan is no longer available.
                              </p>
                            ) : (
                              <p className="text-[#6445E8]">
                                Your free plan is available to use.
                              </p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {basicCount !== 0 ? (
                <Card
                  className={`border-transparent shadow-md relative ${
                    selectedPlan === "Basic Plan"
                      ? "bg-[#FFBA43]/20"
                      : "bg-gray-100"
                  } ${isDisabled ? "cursor-not-allowed" : ""}`}
                  onClick={
                    isDisabled
                      ? () => setShowDialog(true)
                      : () => handleCardClick(basicProtections, "Basic Plan")
                  }
                >
                  <CardContent className="pb-8 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg mt-2 mb-0.5 font-semibold">
                          Basic plan
                        </h2>
                        <span className="text-sm text-[#6445E8]">
                          {basicCount} available
                        </span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center w-5 h-5 bg-red-500/20 rounded-full">
                              <span className="text-red-500 text-xs font-bold">
                                !
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-[#6445E8]">
                              Your basic plan is available to use.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardContent>
                  {(!userProfile?.identityVerificationUrl ||
                    userProfile?.verificationStatus === "pending" ||
                    userProfile?.verificationStatus === "failed") && (
                    <div className="absolute inset-0 bg-gray-100/50"></div>
                  )}
                </Card>
              ) : null}

              {proCount !== 0 ? (
                <Card
                  className={`border-transparent shadow-md relative ${
                    selectedPlan === "Pro Plan"
                      ? "bg-[#38C793]/20"
                      : "bg-gray-100"
                  } ${isDisabled ? "cursor-not-allowed" : ""}`}
                  onClick={
                    isDisabled
                      ? () => setShowDialog(true)
                      : () => handleCardClick(proProtections, "Pro Plan")
                  }
                >
                  <CardContent className="pb-8 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg mt-2 mb-0.5 font-semibold">
                          Pro plan
                        </h2>
                        <span className="text-sm text-[#6445E8]">
                          {proCount} available
                        </span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center w-5 h-5 bg-red-500/20 rounded-full">
                              <span className="text-red-500 text-xs font-bold">
                                !
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-[#6445E8]">
                              Your pro plan is available to use.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardContent>
                  {(!userProfile?.identityVerificationUrl ||
                    userProfile?.verificationStatus === "pending" ||
                    userProfile?.verificationStatus === "failed") && (
                    <div className="absolute inset-0 bg-gray-100/50"></div>
                  )}
                </Card>
              ) : null}
            </div>

            <div className="grid gap-3 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="deviceType">Type</Label>
                <Select
                  value={deviceType}
                  onValueChange={(value) =>
                    handleDeviceSelection(value as DeviceType)
                  }
                  disabled={!selectedProtectionId}
                >
                  <SelectTrigger
                    id="deviceType"
                    className="w-full bg-gray-50 border-gray-200"
                  >
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid mt-2.5 gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Select
                  onValueChange={(id: string) => handleBrandChange(id)}
                  disabled={!deviceType}
                >
                  <SelectTrigger id="brand">
                    <SelectValue placeholder={`Select ${deviceType} brand`} />
                  </SelectTrigger>
                  <SelectContent>
                    {getBrandsForDevice(deviceType).map((brand) => (
                      <SelectItem
                        key={brand.id}
                        value={brand.id}
                        className="flex items-center"
                      >
                        {brand.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid mt-2.5 gap-2">
                <Label htmlFor="model">
                  {deviceBrand
                    ? `Which ${deviceBrand.toLowerCase()} model is it?`
                    : `Model`}
                </Label>
                {modelInputVisible ? (
                  <Input
                    type="text"
                    id="model"
                    placeholder="Please type in the name of the device"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                  />
                ) : (
                  <Select
                    onValueChange={(id: string) => handleModelChange(id)}
                    disabled={!deviceBrand || availableModels.length === 0}
                  >
                    <SelectTrigger id="model">
                      <SelectValue
                        placeholder={
                          deviceBrand
                            ? `Select ${deviceBrand.toLocaleLowerCase()} model`
                            : `Select device model`
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem
                          key={model.id}
                          value={model.id}
                          className="flex items-center"
                        >
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <div className="grid gap-2 mt-2.5">
              <Label htmlFor="condition">Condition</Label>
              <Select
                onValueChange={handleConditionChange}
                value={condition}
                disabled={!deviceModel}
              >
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select device condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">
                    New - Unopened, unused, in original packaging
                  </SelectItem>
                  <SelectItem value="fairly-new">
                    Fairly New - Lightly used, no visible wear, works perfectly
                  </SelectItem>
                  <SelectItem value="good">
                    Good - Fully functional, minor wear like small scratches
                  </SelectItem>
                  <SelectItem value="acceptable">
                    Acceptable - Functional with noticeable wear, may need minor
                    repairs
                  </SelectItem>
                  <SelectItem value="poor">
                    Poor - Heavily worn or partially functional, may need
                    repairs
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 mt-2.5">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                type="text"
                id="serialNumber"
                placeholder="Enter device serial number"
                value={serialNumber}
                onChange={handleSerialNumberChange}
                className={`${!isSerialValid ? "border-red-500" : ""}`}
                disabled={!condition}
              />
              {!isSerialValid && (
                <p className="text-red-500 text-xs sm:text-sm">
                  Invalid serial number format for your{" "}
                  {deviceBrand.toLowerCase()} device. Please check to confirm.
                </p>
              )}
            </div>

            {selectedPlan === "Free Plan" ? (
              <div className="grid w-full mt-4 items-center gap-1.5">
                <Label>
                  Device Image
                  <span className="ml-1 text-muted-foreground text-xs italic">
                    (Drag 'n' drop or click to upload)
                  </span>
                </Label>

                <div className="relative border rounded-lg p-3 w-full flex items-start justify-start cursor-pointer hover:bg-[#6445E8]/5">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    Upload here
                  </span>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                    }}
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
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleFile(file);
                    }}
                  />
                  {!serialNumber && (
                    <div className="absolute inset-0 bg-transparent cursor-not-allowed" />
                  )}
                </div>
                {uploadingDeviceFile ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Uploading image...
                    </p>
                    <Progress value={uploadProgress} className="mt-1" />
                  </>
                ) : selectedDeviceFile ? (
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Uploaded: <strong>{selectedDeviceFile.name}</strong>
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="flex mt-2 ml-auto">
              <Button
                className="mt-auto mr-4 ml-4 mb-4 inline-flex items-center gap-2 px-20 py-7 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white"
                onClick={handleDeviceOnboard}
                disabled={!selectedProtectionId || !serialNumber}
              >
                Continue
              </Button>
            </div>
          </main>
        </>
      )}
    </>
  );
};
