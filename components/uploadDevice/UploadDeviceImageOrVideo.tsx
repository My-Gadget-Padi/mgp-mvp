import { useRef, useState } from "react";
import { UploadDeviceImageOrVideoProps } from "@/types";
import { Loader, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";

type FileExtension = "mp4" | "webm" | "avi" | "mov" | "mkv" | "flv" | "m4v" | "ogv" | 
                     "jpg" | "jpeg" | "png" | "gif" | "bmp" | "tiff" | "webp" | "svg" | "heif";

const UploadDeviceImageOrVideo = ({
  setFile,
  setFileStorageId,
  file,
  setContentType
}: UploadDeviceImageOrVideoProps) => {
  const [isFileLoading, setIsFileLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getFileUrl = useMutation(api.repairRequests.getUrl);

  const [fileName, setFileName] = useState("");

  const getMimeType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() as FileExtension | undefined;

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

  const handleFile = async (blob: Blob, fileName: string) => {
    setIsFileLoading(true);
    setFile("");

    try {
      const mimeType = getMimeType(fileName);

      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setFileStorageId(storageId);
      setContentType(mimeType);

      const fileUrl = await getFileUrl({ storageId });
      setFile(fileUrl!);
      setFileName(fileName);
      setIsFileLoading(false);
      toast({
        title: "File uploaded successfully",
      });
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading file", variant: "destructive" });
    }
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleFile(blob, file.name);
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading file", variant: "destructive" });
    }
  };

  return (
    <div className="w-full flex-wrap">
      <div
        className="flex-center h-[150px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed bg-white"
        onClick={() => fileRef?.current?.click()}
      >
        <Input
          type="file"
          className="hidden"
          ref={fileRef}
          onChange={(e) => uploadFile(e)}
        />
        {!isFileLoading ? (
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

      {fileName && (
        <div className="w-full">
          <p className="mt-5 text-sm">{fileName}</p>
        </div>
      )}

      {!fileName && file && (
        <div className="flex-center w-full">
          <p className="mt-5 text-sm">{file}</p>
        </div>
      )}
    </div>
  );
};

export default UploadDeviceImageOrVideo;