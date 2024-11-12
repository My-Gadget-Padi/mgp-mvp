"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
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
import LoaderSpinner from "@/components/loader/loader-spinner";
import { Progress } from "@/components/ui/progress";

type ProofType = "upload-video" | "video-call" | "on-site";

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
  | "heif";

interface DeviceProps {
  deviceId: Id<"devices">;
}

const OwnershipProof = ({ deviceId }: DeviceProps) => {
  const [proofType, setProofType] = useState<ProofType | "">("");
  const [location, setLocation] = useState<LocationType | "">("");
  const [selectedProofFile, setSelectedProofFile] = useState<File | null>(
    null
  );

   const [fileStorageId, setFileStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [deviceUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadingDeviceFile, setUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDeviceFile, setSelectedDeviceFile] = useState<File | null>(
    null
  );
  const [contentType, setContentType] = useState<string>("");

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl, {
    onUploadProgress: (progress: any) => setUploadProgress(progress),
  });

  const getFileUrl = useMutation(api.repairRequests.getUrl);

  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const device = useQuery(api.devices.getDeviceById, {
    deviceId
  });

  const verifyDevice = useMutation(api.devices.deviceVerification);

  useEffect(() => {
    if (!device) return;

    const { planName, _id } = device;
    
    if (planName === "Free Plan" && _id) {
      router.push("/protection/plans");
    }
  }, [device, router]);

  const handleVerificationType = (value: ProofType) => {
    setProofType(value);
  };

  const handleChooseLocation = (value: LocationType) => {
    setLocation(value);
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
    };

    return mimeTypes[extension as FileExtension] || "application/octet-stream";
  };

  const uploadFile = async (blob: Blob, fileName: string) => {
    setUploadingFile(true);
    setUploadProgress(0);
    try {
      const mimeType = getMimeType(fileName);
      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setFileStorageId(storageId);
      setContentType(mimeType);

      const fileUrl = await getFileUrl({ storageId });
      setFileUrl(fileUrl as string);
      toast({
        title: "Success",
        description: "File uploaded successfully!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error uploading file",
        variant: "destructive",
      });
    } finally {
      setUploadingFile(false);
    }
  };

  const handleProofFile = async (file: File) => {
    try {
      setSelectedProofFile(file);
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      await uploadFile(blob, file.name);
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  const address = "14 niger Street, portharcourt, rivers state";

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
    address
  )}`;

  return (
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
              accept="image/*, pdf/*"
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
        </div>
        <div className="grid gap-2 mt-4">
          <Label htmlFor="proofType">How do you want to be verified?</Label>
          <Select
            value={proofType}
            onValueChange={(value) =>
              handleVerificationType(value as ProofType)
            }
          >
            <SelectTrigger id="ProofType">
              <SelectValue placeholder="Select verification method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upload-video">Upload a video</SelectItem>
              <SelectItem value="video-call">
                Video call verification
              </SelectItem>
              <SelectItem value="on-site">I'll verify at a MGP hub</SelectItem>
            </SelectContent>
            {proofType === "upload-video" ? (
              <span className="text-muted-foreground text-xs">
                Please upload a clear video of your device showing every part of
                it and specifically showing the serial number for verification.
              </span>
            ) : proofType === "video-call" ? (
              <span className="text-muted-foreground text-xs">
                Clicking done will automatically redirect you to a video call
                with one of our customer service for verification on WhatsApp.
              </span>
            ) : proofType === "on-site" ? (
              <span className="text-muted-foreground text-xs">
                Please visit any of our hubs close to you with the ID number
                that will be sent to your mail for verification.
              </span>
            ) : null}
          </Select>
        </div>

        {proofType === "upload-video" ? (
          <>
            <div className="grid gap-2 mt-4">
              <div className="flex flex-col items-start space-y-1">
                <Label className="text-sm font-medium text-gray-900">
                  Video of device(5mb max)
                </Label>
                <div className="relative border rounded-lg p-3 w-full flex items-start justify-start cursor-pointer hover:bg-[#6445E8]/5">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    Upload here
                  </span>
                  <Input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start space-y-1 mt-4">
                <Label className="text-sm font-medium text-gray-900">
                  Your picture holding identity card(2mb max)
                </Label>
                <div className="relative border rounded-lg p-3 w-full flex items-start justify-start cursor-pointer hover:bg-[#6445E8]/5">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    Upload here
                  </span>
                  <Input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-2 ml-auto">
              <Button className="mt-auto mr-4 ml-4 mb-4 inline-flex items-center gap-2 px-20 py-7 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white">
                Continue
              </Button>
            </div>
          </>
        ) : proofType === "video-call" ? (
          <>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="call">Launch call</Label>
            </div>
            <div className="flex mt-2 ml-auto">
              <Button className="mt-auto mr-4 ml-4 mb-4 inline-flex items-center gap-2 px-20 py-7 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white">
                Done
              </Button>
            </div>
          </>
        ) : proofType === "on-site" ? (
          <>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="location">Choose location</Label>
            </div>
            <Select
              value={location}
              onValueChange={(value) =>
                handleChooseLocation(value as LocationType)
              }
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="akure">Akure, Ondo State</SelectItem>
                <SelectItem value="ibadan">Ibadan, Oyo State</SelectItem>
                <SelectItem value="portharcourt">
                  Portharcourt, Rivers State
                </SelectItem>
                <SelectItem value="lagos">Lagos State</SelectItem>
              </SelectContent>
              <span className="text-muted-foreground text-xs">
                Select a location closest to you.
              </span>
            </Select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg shadow-md overflow-hidden">
                <div className="h-40">
                  <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.3279170675594!2d3.8959997146130915!3d7.3775359946524735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039f3310da51de7%3A0x32b63d7387d1e5e2!2sIwo%20Rd%2C%20Ibadan!5e0!3m2!1sen!2sng!4v1616598408972!5m2!1sen!2sng"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <div className="flex flex-1">
                    <h2 className="text-lg font-semibold">Olukayode Complex</h2>
                    <Badge className="px-4 ml-auto bg-[#6445E8]/10 text-primary">
                      Ibadan
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    NO 78, Iwo Road, Opposite Ibadan North East Local Government
                    Ibadan North East, Ibadan 234801
                  </p>
                  <div className="flex mt-4">
                    <Link
                      href="https://maps.google.com?q=NO 78, Iwo Road, Opposite Ibadan North East Local Government Ibadan North East, Ibadan 234801"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant={"outline"}
                        className="border border-[#6445E8] text-[#6445E8] hover:bg-[#6445E8] hover:text-white"
                      >
                        Open on map
                      </Button>
                    </Link>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="ml-auto">
                            <CopyToClipboard text="https://maps.google.com?q=NO 78, Iwo Road, Opposite Ibadan North East Local Government Ibadan North East, Ibadan 234801">
                              <Copy
                                className="h-10 w-6 stroke-[#6445E8]"
                                onClick={() =>
                                  toast({
                                    title: "Address copied to clipboard!",
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

              <div className="rounded-lg shadow-md overflow-hidden">
                <div className="h-40">
                  <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.3279170675594!2d3.8959997146130915!3d7.3775359946524735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039f3310da51de7%3A0x32b63d7387d1e5e2!2sIwo%20Rd%2C%20Ibadan!5e0!3m2!1sen!2sng!4v1616598408972!5m2!1sen!2sng"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <div className="flex flex-1">
                    <h2 className="text-lg font-semibold">Olukayode Complex</h2>
                    <Badge className="px-4 ml-auto bg-[#6445E8]/10 text-primary">
                      Ibadan
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    NO 78, Iwo Road, Opposite Ibadan North East Local Government
                    Ibadan North East, Ibadan 234801
                  </p>
                  <div className="flex mt-4">
                    <Link
                      href="https://maps.google.com?q=NO 78, Iwo Road, Opposite Ibadan North East Local Government Ibadan North East, Ibadan 234801"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant={"outline"}
                        className="border border-[#6445E8] text-[#6445E8] hover:bg-[#6445E8] hover:text-white"
                      >
                        Open on map
                      </Button>
                    </Link>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="ml-auto">
                            <CopyToClipboard text="https://maps.google.com?q=NO 78, Iwo Road, Opposite Ibadan North East Local Government Ibadan North East, Ibadan 234801">
                              <Copy
                                className="h-10 w-6 stroke-[#6445E8]"
                                onClick={() =>
                                  toast({
                                    title: "Address copied to clipboard!",
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
            </div>

            <div className="flex mt-2 ml-auto">
              <Button className="mt-auto mr-4 ml-4 mb-4 inline-flex items-center gap-2 px-20 py-7 rounded-lg bg-[#6445E8] text-white hover:bg-[#6445E8] hover:text-white">
                Continue
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
};

export default OwnershipProof;