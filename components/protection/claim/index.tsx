"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stepper } from "@/components/repair/stepper";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCheck,
  MessageSquareMore,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Id } from "@/convex/_generated/dataModel";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import LoaderSpinner from "@/components/loader/loader-spinner";
import { Progress } from "@/components/ui/progress";

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

interface ProtectionProps {
  protectionId: Id<"deviceProtections">;
}

const DeviceClaim = ({ protectionId }: ProtectionProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;

  const [isOpen, setIsOpen] = useState(false);
  const [device, setDevice] = useState<any>(null);

  const [deviceType, setDeviceType] = useState("phone"); //tablet, laptop, computer
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceModel, setDeviceModel] = useState("");

  const [selectedDamages, setSelectedDamages] = useState<string[]>([]);
  const [otherDamage, setOtherDamage] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);
  const [priority, setPriority] = useState("");

  //Device Image/Video
  const [fileStorageId, setFileStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [deviceFileUrl, setDeviceFileUrl] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadingDeviceFile, setUploadingDeviceFile] = useState(false);
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

  const createRequest = useMutation(api.repairRequests.createRepairRequest);

  const damages = [
    "Broken Screen",
    "Doesn't Power On",
    "Broken Inner Screen",
    "Water Damage",
    "Broken Outer Screen",
    "Short Battery Life",
    "Won't Charge",
    "Back Camera Doesn't Work",
    "Can't Hear / No Audio",
    "Microphone Doesn't Work",
    "Volume Button Doesn't Work",
    "Power Button Doesn't Work",
    "Vibrator",
    "Back Housing/Cover",
    "Ear Speaker / No Audio",
    "I don't know / Other",
  ];

  useEffect(() => {
    const storedDevice = localStorage.getItem("device");
    if (storedDevice) {
      setDevice(JSON.parse(storedDevice));
    }
  }, []);

  useEffect(() => {
    if (device) {
      setDeviceType(device?.type);
      setDeviceBrand(device?.brand);
      setDeviceModel(device?.model);
      setDeviceFileUrl(device?.imageUrl);
    }
  }, [device]);

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

  const uploadDamageFile = async (blob: Blob, fileName: string) => {
    setUploadingDeviceFile(true);
    setUploadProgress(0);
    try {
      const mimeType = getMimeType(fileName);
      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setFileStorageId(storageId);
      setContentType(mimeType);

      const fileUrl = await getFileUrl({ storageId });
      setDeviceFileUrl(fileUrl as string);
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
      setUploadingDeviceFile(false);
    }
  };

  const handleFile = async (file: File) => {
    try {
      setSelectedDeviceFile(file);
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      await uploadDamageFile(blob, file.name);
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  const handleDeviceFix = async () => {
    setLoading(true);

    try {
      const requestId = await createRequest({
        userId: profileId as Id<"users">,
        protectionId,
        user_status: "registered",
        device: deviceType,
        brandName: deviceBrand,
        model: deviceModel,
        damages: selectedDamages,
        comments: otherDamage,
        priority,
        fileUrl: deviceFileUrl || "",
        fileStorageId: fileStorageId !== null ? fileStorageId : undefined,
        contentType,
      });

      setLoading(false);

      toast({
        title: "Repair request created",
        description: "You will be redirected.",
      });

      setDeviceType("phone");
      setDeviceBrand("");
      setDeviceModel("");
      setPriority("");
      setSelectedDamages([]);
      setOtherDamage("");
      setShowTextarea(false);
      setSelectedDeviceFile(null);
      setFileStorageId(null);
      setDeviceFileUrl("");

      router.push(`/repair/${requestId}`);
    } catch (error) {
      console.error("Repair request error", error);
      toast({
        title: "Repair request is unsuccessful",
        variant: "destructive",
      });
    }
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedDamages((prev) => {
      const isAlreadySelected = prev.includes(value);
      const updatedDamages = isAlreadySelected
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      if (value === "I don't know / Other") {
        setShowTextarea(!isAlreadySelected);
        if (isAlreadySelected) {
          setOtherDamage("");
        }
      }
      return updatedDamages;
    });
  };

  const handleShowComment = () => {
    setShowTextarea((prev) => !prev);
  };

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={1} />

      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">Start Claim</h1>
              <p className="text-muted-foreground text-sm">
                What kind of {deviceType} is it?
              </p>
            </div>
            {/**<Input />*/}
          </div>

          <div className="grid gap-3">
            <div className="grid gap-2">
              <Input type="text" id="model" readOnly value={deviceBrand} />
            </div>
            <div className="grid mt-2.5 gap-2">
              <Label htmlFor="model">
                {deviceBrand ? `Which ${deviceBrand} model is it?` : `Model`}
              </Label>

              <Input type="text" id="model" readOnly value={deviceModel} />
            </div>
          </div>

          <div className="grid w-full mt-4 items-center gap-1.5">
            <Label>
              Gadget Damage Image/Video
              <span className="ml-1 text-muted-foreground text-xs italic">
                (Drag 'n' drop or click to upload)
              </span>
            </Label>

            <Input
              id="file-upload"
              type="file"
              accept="image/*, video/*"
              disabled={!deviceBrand || !deviceModel}
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
            {uploadingDeviceFile ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Uploading file...
                </p>
                <Progress value={uploadProgress} className="mt-1" />
              </>
            ) : selectedDeviceFile || deviceFileUrl ? (
              <div className="text-sm text-muted-foreground">
                <p>
                  Uploaded:{" "}
                  <strong>
                    {selectedDeviceFile?.name || `Device file present`}
                  </strong>
                </p>
              </div>
            ) : null}
          </div>

          <div className="gap-2 mt-2">
            <Label htmlFor="damages">Damages</Label>
            <div className="grid grid-cols-4">
              <div className="col-span-3">
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                  disabled={!deviceBrand || !deviceModel}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <span className="text-muted-foreground animate-pulse">
                      Selecting...
                    </span>
                  ) : (
                    <span className="font-normal">Select damage(s)</span>
                  )}
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>

                {isOpen && (
                  <ScrollArea className="mt-2 border rounded-md max-h-64 overflow-y-auto">
                    <div className="p-4">
                      {damages.map((damage) => (
                        <div
                          key={damage}
                          className={`flex items-center space-x-2 mb-2 cursor-pointer ${
                            selectedDamages.includes(damage)
                              ? "text-[#6445E8]"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => handleCheckboxChange(damage)}
                        >
                          <Checkbox
                            checked={selectedDamages.includes(damage)}
                          />
                          <span>{damage}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>

              <Button
                className="col-span-1 ml-2 bg-[#6445E8] hover:bg-[#6445E8]/80 text-white"
                disabled={!deviceBrand || !deviceModel}
                variant={!deviceBrand || !deviceModel ? "secondary" : "default"}
                onClick={() => handleShowComment()}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MessageSquareMore className="flex sm:hidden" />
                      <span className="hidden sm:flex">Describe the issue</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Click here to provide additional details about your{" "}
                        {deviceType}'s issue.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button>
            </div>
          </div>

          {selectedDamages.length > 0 && (
            <div>
              {selectedDamages.some(
                (damage) => damage !== "I don't know / Other"
              ) && <p className="text-sm">Selected:</p>}
              <ul>
                {selectedDamages
                  .filter((damage) => damage !== "I don't know / Other") // Exclude "Other"
                  .map((damage, index) => (
                    <li
                      key={index}
                      className="mt-1 text-muted-foreground text-sm capitalize"
                    >
                      <CheckCheck className="w-4 h-4 inline-flex mr-2" />
                      {damage}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {showTextarea && (
            <div>
              <Label htmlFor="other-damage">Please describe the issue:</Label>
              <Textarea
                id="other-damage"
                rows={6}
                value={otherDamage}
                onChange={(e) => setOtherDamage(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
                placeholder={`I need a quick fix, my ${deviceType}'s screen is broken.`}
              />
            </div>
          )}

          <div className="grid gap-2 mt-4">
            <Label htmlFor="priority">
              Repair Priority{" "}
              <span className="text-muted-foreground text-xs">
                (how urgently do you need your device fixed?)
              </span>
            </Label>
            <Select
              onValueChange={handlePriorityChange}
              value={priority}
              disabled={!deviceModel}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select repair priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6">
            <button
              disabled={!deviceModel}
              onClick={handleDeviceFix}
              type="button"
              className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-lg px-9 py-4 text-base font-medium text-white duration-300 ${
                !deviceModel
                  ? "bg-[#6445E8] cursor-not-allowed opacity-50"
                  : "bg-[#6445E8] hover:bg-[#6445E8]/80"
              }`}
            >
              Submit Claim
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default DeviceClaim;