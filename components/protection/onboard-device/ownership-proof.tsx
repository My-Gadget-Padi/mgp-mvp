"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
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
import { Upload, Copy } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { Progress } from "@/components/ui/progress";
import PageLoader from "@/components/PageLoader";

type ProofType = "video" | "call" | "hub";

type LocationType = "lagos" | "portharcourt" | "ibadan" | "akure";

type FileExtension =
  | "mp4"
  | "webm"
  | "avi"
  | "mov"
  | "mkv"
  | "flv"
  | "m4v"
  | "ogv"
  | "jpg"
  | "jpeg"
  | "png"
  | "gif"
  | "bmp"
  | "tiff"
  | "webp"
  | "svg"
  | "heif"
  | "pdf";

interface Address {
  title: string;
  address: string;
  mapUrl: string;
  googleMapsLink: string;
}

interface DeviceProps {
  deviceId: Id<"devices">;
}

const locations: Record<LocationType, Address[]> = {
  akure: [
    {
      title: "LAH Lounge",
      address:
        "LAH Lounge Opposite Foursquare Gospel Church, FUTA Southgate Road, Igbatoro Rd, Akure, Ondo State, Nigeria, 340110",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.4966806145616!2d5.14970091461521!3d7.310467994713997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103c70a82c9e9c1f%3A0x75c08f09c78f340a!2sLAH%20Lounge%2C%20FUTA%20Southgate%20Rd%2C%20Akure!5e0!3m2!1sen!2sng!4v1616598408972!5m2!1sen!2sng",
      googleMapsLink:
        "https://maps.google.com?q=Opposite+Foursquare+Gospel+Church,+FUTA+Southgate+Road,+Igbatoro+Rd,+Akure,+Ondo+State",
    },
  ],

  ibadan: [
    {
      title: "Olukayode Complex",
      address:
        "NO 78, Iwo Road, Opposite Ibadan North East Local Government, Ibadan North East, Ibadan, Oyo State, Nigeria, 234801",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.3279170675594!2d3.8959997146130915!3d7.3775359946524735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039f3310da51de7%3A0x32b63d7387d1e5e2!2sIwo%20Rd%2C%20Ibadan!5e0!3m2!1sen!2sng!4v1616598408972!5m2!1sen!2sng",
      googleMapsLink:
        "https://maps.google.com?q=NO+78,+Iwo+Road,+Opposite+Ibadan+North+East+Local+Government,+Ibadan,+Oyo+State,+Nigeria,+234801",
    },
  ],

  lagos: [
    {
      title: "IT IS WELL PLAZA",
      address:
        "Suite 24/25, It Is Well Plaza, No. 17 Ola Ayeni Street, Computer Village, Ikeja, Lagos, Nigeria, 100271",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.432897182763!2d3.34973031567134!3d6.596648527193451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93f1db2a249d%3A0x3b82ef63b5655e6e!2sIt%20Is%20Well%20Plaza!5e0!3m2!1sen!2sng!4v1697913252134",
      googleMapsLink:
        "https://maps.google.com?q=Suite+24/25,+It+Is+Well+Plaza,+No+17+Ola+Ayeni+Street,+Computer+Village,+Ikeja,+Lagos,+Nigeria,+100271",
    },
  ],

  portharcourt: [],
};

const OwnershipProof = ({ deviceId }: DeviceProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string | "">("");

  const [proofType, setProofType] = useState<ProofType | "">("");
  const [location, setLocation] = useState<LocationType | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedProofFile, setSelectedProofFile] = useState<File | null>(null);
  const [selectedVerifyFile, setSelectedVerifyFile] = useState<File | null>(
    null
  );

  const [fileStorageId, setFileStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [verifyFileStorageId, setVerifyFileStorageId] =
    useState<Id<"_storage"> | null>(null);

  const [fileUrl, setFileUrl] = useState("");
  const [verifyFileUrl, setVerifyFileUrl] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const [sizeError, setSizeError] = useState<boolean>(false);

  const [uploadingProofFile, setUploadingProofFile] = useState(false);
  const [uploadingVerifyFile, setUploadingVerifyFile] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [contentType, setContentType] = useState<string>("");

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl, {
    onUploadProgress: (progress: any) => setUploadProgress(progress),
  });

  const getFileUrl = useMutation(api.devices.getUrl);

  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const device = useQuery(api.devices.getDeviceById, {
    deviceId,
  });

  const plan = useQuery(api.plans.getPlanByName, {
    name: device?.planName
  });

  const verifyDevice = useMutation(
    api.verificationRequests.createVerificationRequest
  );

  const sendBasicEmail = useAction(api.sendEmail.basicPlanActivatedEmail);

  const sendProEmail = useAction(api.sendEmail.proPlanActivatedEmail);

  useEffect(() => {
    if (!device) return;

    const { planName, _id } = device;

    if (planName === "Free Plan" && _id) {
      router.push("/protection/plans");
    }
  }, [device, router]);

  const workingHours = [];
  let currentHour = new Date();
  currentHour.setHours(9, 0, 0, 0);

  while (currentHour.getHours() < 17) {
    workingHours.push(
      currentHour.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
    currentHour.setMinutes(currentHour.getMinutes() + 30);
  }

  const handleVerificationType = (value: ProofType) => {
    setProofType(value);
  };

  const handleChooseLocation = (value: LocationType) => {
    setLocation(value);
    setSelectedAddress(null);
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleChooseTime = (value: string) => {
    setTime(value);
  };

  const getMimeType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() as
      | FileExtension
      | undefined;

    const mimeTypes: Record<FileExtension, string> = {
      // Video file extensions
      mp4: "video/mp4",
      webm: "video/webm",
      avi: "video/x-msvideo",
      mov: "video/quicktime",
      mkv: "video/x-matroska",
      flv: "video/x-flv",
      m4v: "video/x-m4v",
      ogv: "video/ogg",

      // Image file extensions
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      bmp: "image/bmp",
      tiff: "image/tiff",
      webp: "image/webp",
      svg: "image/svg+xml",
      heif: "image/heif",

      // Document file extensions
      pdf: "application/pdf",
    };

    return mimeTypes[extension as FileExtension] || "application/octet-stream";
  };

  const uploadFile = async (blob: Blob, fileName: string) => {
    setUploadingProofFile(true);
    setUploadProgress(0);
    try {
      const mimeType = getMimeType(fileName);
      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setFileStorageId(storageId);

      const fileUrl = await getFileUrl({ storageId });
      setFileUrl(fileUrl as string);
      toast({
        title: "Success",
        description: "File uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading file",
        variant: "destructive",
      });
    } finally {
      setUploadingProofFile(false);
    }
  };

  const uploadVerifyFile = async (blob: Blob, fileName: string) => {
    setUploadingVerifyFile(true);
    setUploadProgress(0);
    try {
      const mimeType = getMimeType(fileName);
      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setVerifyFileStorageId(storageId);
      setContentType(mimeType);

      const fileUrl = await getFileUrl({ storageId });
      setVerifyFileUrl(fileUrl as string);
      toast({
        title: "Success",
        description: "Video uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading video",
        variant: "destructive",
      });
    } finally {
      setUploadingVerifyFile(false);
    }
  };

  const handleProofFile = async (file: File) => {
    try {
      setSelectedProofFile(file);
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      await uploadFile(blob, file.name);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading file, try again.",
        variant: "destructive",
      });
    }
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleVerifyFile = async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setSizeError(true);
      return;
    }

    try {
      setSelectedVerifyFile(file);
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      await uploadVerifyFile(blob, file.name);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading verification file, try again.",
        variant: "destructive",
      });
    }
  };

  const handleVideoVerification = async () => {
    try {
      setLoading(true);

      const responseId = await verifyDevice({
        userId: userProfile?._id as Id<"users">,
        deviceId,
        verificationMode: proofType,
        proofOfOwnershipUrl: fileUrl,
        proofStorageId: fileStorageId as Id<"_storage">,
        verificationUrl: verifyFileUrl,
        verificationStorageId: verifyFileStorageId as Id<"_storage">,
        contentType: contentType,
      });

      if (responseId) {
        if (device?.planName === "Basic Plan") {
          await sendBasicEmail({
            emailAddress: userProfile?.email as string,
            firstName: userProfile?.firstName as string,
            device: device?.model,
            duration: `${plan?.durationMonths} months`,
            coverage: `N${plan?.maxRedemptionAmount.toLocaleString()} - 1 device`,
            claimLimit: `${plan?.claimLimit} claims`
          });
        } else if (device?.planName === "Pro Plan") {
          await sendProEmail({
            emailAddress: userProfile?.email as string,
            firstName: userProfile?.firstName as string,
            device: device?.model,
            duration: `${plan?.durationMonths} months`,
            coverage: `N${plan?.maxRedemptionAmount.toLocaleString()} - 1 device`,
            claimLimit: `${plan?.claimLimit} claims`
          });
        }
        toast({
          title: "Success",
          description:
            "Your device has been successfully onboarded and is currently undergoing verification.",
        });
        router.push(`/protection/onboard/success/${deviceId}`);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Device could not be verified.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCallVerification = async () => {
    try {
      setLoading(true);

      const responseId = await verifyDevice({
        userId: userProfile?._id as Id<"users">,
        deviceId,
        verificationMode: proofType,
        proofOfOwnershipUrl: fileUrl,
        proofStorageId: fileStorageId as Id<"_storage">,
        callDate: date?.toDateString(),
        callTime: time,
      });

      if (responseId) {
        if (device?.planName === "Basic Plan") {
          await sendBasicEmail({
            emailAddress: userProfile?.email as string,
            firstName: userProfile?.firstName as string,
            device: device?.model,
            duration: `${plan?.durationMonths} months`,
            coverage: `N${plan?.maxRedemptionAmount.toLocaleString()} - 1 device`,
            claimLimit: `${plan?.claimLimit} claims`
          });
        } else if (device?.planName === "Pro Plan") {
          await sendProEmail({
            emailAddress: userProfile?.email as string,
            firstName: userProfile?.firstName as string,
            device: device?.model,
            duration: `${plan?.durationMonths} months`,
            coverage: `N${plan?.maxRedemptionAmount.toLocaleString()} - 1 device`,
            claimLimit: `${plan?.claimLimit} claims`
          });
        }
        toast({
          title: "Success",
          description:
            "Your device has been successfully onboarded and is currently undergoing verification.",
        });
        router.push(`/protection/onboard/success/${deviceId}`);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Device could not be verified.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHubVerification = async () => {
    try {
      setLoading(true);

      const responseId = await verifyDevice({
        userId: userProfile?._id as Id<"users">,
        deviceId,
        verificationMode: proofType,
        proofOfOwnershipUrl: fileUrl,
        proofStorageId: fileStorageId as Id<"_storage">,
        addressSelected: selectedAddress?.address,
      });

      if (responseId) {
        if (device?.planName === "Basic Plan") {
          await sendBasicEmail({
            emailAddress: userProfile?.email as string,
            firstName: userProfile?.firstName as string,
            device: device?.model,
            duration: `${plan?.durationMonths} months`,
            coverage: `N${plan?.maxRedemptionAmount.toLocaleString()} - 1 device`,
            claimLimit: `${plan?.claimLimit} claims`
          });
        } else if (device?.planName === "Pro Plan") {
          await sendProEmail({
            emailAddress: userProfile?.email as string,
            firstName: userProfile?.firstName as string,
            device: device?.model,
            duration: `${plan?.durationMonths} months`,
            coverage: `N${plan?.maxRedemptionAmount.toLocaleString()} - 1 device`,
            claimLimit: `${plan?.claimLimit} claims`
          });
        }
        toast({
          title: "Success",
          description:
            "Your device has been successfully onboarded and is currently undergoing verification.",
        });
        router.push(`/protection/onboard/success/${deviceId}`);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Device could not be verified.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <main className="flex flex-1 mt-6 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="grid gap-3 mt-4">
            <div className="flex flex-col items-start space-y-1">
              <Label className="text-sm font-medium text-gray-900">
                Proof of purchase/ownership (receipt)
              </Label>
              <div className="relative border rounded-lg p-3 w-full flex items-start justify-start cursor-pointer hover:bg-[#6445E8]/5">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Upload here
                </span>
                <Input
                  id="proof-upload"
                  type="file"
                  accept="image/*, application/pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) handleProofFile(file);
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
                    if (file) handleProofFile(file);
                  }}
                />
              </div>
              {uploadingProofFile ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Uploading proof...
                  </p>
                  <Progress value={uploadProgress} className="mt-1" />
                </>
              ) : selectedProofFile ? (
                <div className="text-sm text-muted-foreground">
                  <p>
                    Uploaded: <strong>{selectedProofFile.name}</strong>
                  </p>
                </div>
              ) : null}
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="proofType">How do you want to be verified?</Label>
              <Select
                value={proofType}
                onValueChange={(value) =>
                  handleVerificationType(value as ProofType)
                }
                disabled={!fileUrl}
              >
                <SelectTrigger id="ProofType">
                  <SelectValue placeholder="Select verification method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    Video upload verification
                  </SelectItem>
                  <SelectItem value="call">Video call verification</SelectItem>
                  <SelectItem value="hub">I'll verify at a MGP hub</SelectItem>
                </SelectContent>
                {proofType === "video" ? (
                  <span className="text-muted-foreground text-xs">
                    Please upload a clear video of your device showing every
                    part of it and specifically showing the serial number for
                    verification.
                  </span>
                ) : proofType === "call" ? (
                  <span className="text-muted-foreground text-xs">
                    Schedule a date and time for a video call verification with
                    one of our customer service agents.
                  </span>
                ) : proofType === "hub" ? (
                  <span className="text-muted-foreground text-xs">
                    Please visit any of our hubs close to you with the ID number
                    that will be sent to your mail for verification.
                  </span>
                ) : null}
              </Select>
            </div>

            {proofType === "video" ? (
              <>
                <div className="grid gap-2 mt-4">
                  <div className="flex flex-col items-start space-y-1">
                    <Label className="text-sm font-medium text-gray-900">
                      Image/Video of device (5MB max)
                    </Label>
                    <div className="relative border rounded-lg p-3 w-full flex items-start justify-start cursor-pointer hover:bg-[#6445E8]/5">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <span className="ml-2 text-sm text-muted-foreground">
                        Upload here
                      </span>
                      <Input
                        id="device-video"
                        type="file"
                        accept="image/*, video/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) handleVerifyFile(file);
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
                          if (file) handleVerifyFile(file);
                        }}
                      />
                      {!fileUrl && (
                        <div className="absolute inset-0 bg-transparent cursor-not-allowed" />
                      )}
                    </div>
                    {!selectedVerifyFile && sizeError ? (
                      <span className="text-red-500 text-xs">
                        File size exceeds 5MB. Please upload a smaller file.
                      </span>
                    ) : null}
                    {uploadingVerifyFile ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Uploading video...
                        </p>
                        <Progress value={uploadProgress} className="mt-1" />
                      </>
                    ) : selectedVerifyFile ? (
                      <div className="text-sm text-muted-foreground">
                        <p>
                          Uploaded: <strong>{selectedVerifyFile.name}</strong>
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex mt-2 ml-auto">
                  <Button
                    onClick={handleVideoVerification}
                    disabled={!fileUrl}
                    className="mt-auto mr-4 ml-4 mb-4 inline-flex items-center gap-2 px-20 py-7 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white"
                  >
                    Continue
                  </Button>
                </div>
              </>
            ) : proofType === "call" ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-11 justify-start text-left font-normal rounded-xl",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="h-5 w-5 mr-2" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="flex w-auto flex-col space-y-2 p-2"
                        side="bottom"
                        align="start"
                      >
                        <Select
                          onValueChange={(value) =>
                            setDate(addDays(new Date(), parseInt(value)))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="0">Today</SelectItem>
                            <SelectItem value="1">Tomorrow</SelectItem>
                            <SelectItem value="3">In 3 days</SelectItem>
                            <SelectItem value="7">In a week</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Select
                      value={time}
                      onValueChange={(value) =>
                        handleChooseTime(value as string)
                      }
                      disabled={!date}
                    >
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Pick a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {workingHours.map((time, index) => (
                          <SelectItem key={index} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex mt-2 ml-auto">
                  <Button
                    onClick={handleCallVerification}
                    disabled={!time}
                    className="mt-auto mr-4 ml-4 mb-4 inline-flex items-center gap-2 px-20 py-7 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white"
                  >
                    Continue
                  </Button>
                </div>
              </>
            ) : proofType === "hub" ? (
              <>
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="location">Location</Label>
                </div>
                <Select
                  value={location || ""}
                  onValueChange={(value) =>
                    handleChooseLocation(value as LocationType)
                  }
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Ikeja, Lagos State</SelectItem>
                    <SelectItem value="ibadan">Ibadan, Oyo State</SelectItem>
                    <SelectItem value="akure">Akure, Ondo State</SelectItem>
                  </SelectContent>
                  <span className="text-muted-foreground text-xs">
                    Choose a location closest to you.
                  </span>
                </Select>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {location &&
                    locations[location].map((address, index) => (
                      <div
                        key={index}
                        className={`rounded-lg shadow-md overflow-hidden cursor-pointer ${
                          selectedAddress === address
                            ? "border-2 border-[#6445E8]"
                            : ""
                        }`}
                        onClick={() => handleSelectAddress(address)}
                      >
                        <div className="h-40">
                          <iframe
                            className="w-full h-full"
                            src={address.mapUrl}
                            loading="lazy"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className="p-4">
                          <div className="flex flex-1">
                            <h2 className="text-lg font-semibold">
                              {address.title}
                            </h2>
                            <Badge className="px-4 ml-auto bg-[#6445E8]/10 text-primary">
                              {location.charAt(0).toUpperCase() +
                                location.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {address.address}
                          </p>
                          <div className="flex mt-4">
                            <Link
                              href={address.googleMapsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="outline"
                                className="border border-[#6445E8] text-[#6445E8] hover:bg-[#6445E8] hover:text-white"
                              >
                                Open on map
                              </Button>
                            </Link>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className="ml-auto">
                                    <CopyToClipboard
                                      text={address.googleMapsLink}
                                    >
                                      <Copy
                                        className="h-10 w-6 stroke-[#6445E8]"
                                        onClick={() =>
                                          toast({
                                            title:
                                              "Address copied to clipboard!",
                                          })
                                        }
                                      />
                                    </CopyToClipboard>
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-[#6445E8]">
                                    Copy address to clipboard
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {location && (
                  <div className="flex mt-2 ml-auto">
                    <Button
                      onClick={handleHubVerification}
                      disabled={!selectedAddress}
                      className="mt-auto mr-4 ml-4 mb-4 inline-flex items-center gap-2 px-20 py-7 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white"
                    >
                      Continue
                    </Button>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </main>
      )}
    </>
  );
};

export default OwnershipProof;