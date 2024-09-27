import { useRef, useState } from "react";
import { UploadDeviceImageOrVideoProps } from "@/types";
import { Loader, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";

const UploadDeviceImageOrVideo = ({
  setVideo,
  setVideoStorageId,
  video,
}: UploadDeviceImageOrVideoProps) => {
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const videoRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getVideoUrl = useMutation(api.repairRequests.getUrl);

  const [videoName, setVideoName] = useState("");

  const handleVideo = async (blob: Blob, fileName: string) => {
    setIsVideoLoading(true);
    setVideo("");

    try {
      const mimeType = fileName.endsWith(".mp4")
        ? "video/mp4"
        : fileName.endsWith(".webm")
        ? "video/webm"
        : fileName.endsWith(".avi")
        ? "video/x-msvideo"
        : fileName.endsWith(".mov")
        ? "video/quicktime"
        : "application/octet-stream";

      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setVideoStorageId(storageId);

      const videoUrl = await getVideoUrl({ storageId });
      setVideo(videoUrl!);
      setVideoName(fileName);
      setIsVideoLoading(false);
      toast({
        title: "Video uploaded successfully",

      });
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading video", variant: "destructive" });
    }
  };

  const uploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleVideo(blob, file.name);
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading video", variant: "destructive" });
    }
  };

  return (
    <div className="w-full flex-wrap">
      <div className="flex-center h-[150px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed bg-white" onClick={() => videoRef?.current?.click()}>
        <Input
          type="file"
          className="hidden"
          ref={videoRef}
          onChange={(e) => uploadVideo(e)}
        />
        {!isVideoLoading ? (
          <div className="text-16 flex items-center mt-10 justify-center font-medium">
            <UploadCloud className="h-6 w-6" />
          </div>
        ) : (
          <div className="text-16 flex items-center mt-10 justify-center text-[#07796B] font-medium">
            Uploading
            <Loader size={20} className="animate-spin ml-2" />
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-12">Upload file</h2>
          <p className="text-xs">
            JPG, PNG, MP4, AVI, MOV, or WEBM (max. 10MB)
          </p>
        </div>
      </div>

      {videoName && (
        <div className="w-full">
          <p className="mt-5 text-sm">
            {videoName}
          </p>
        </div>
      )}

      {!videoName && video && (
        <div className="flex-center w-full">
          <p className="mt-5 text-sm">{video}</p>
        </div>
      )}
    </div>
  );
};

export default UploadDeviceImageOrVideo;