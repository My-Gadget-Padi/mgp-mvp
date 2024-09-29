import { useRef, useState } from "react";
import { UploadProfileImageProps } from "@/types";
import { Loader, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";

const UploadProfileImage = ({
  setImage,
  setImageStorageId,
  image,
}: UploadProfileImageProps) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.users.getUrl);

  const [imageName, setImageName] = useState("");

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage("");

    try {
      const mimeType = fileName.endsWith(".png")
        ? "image/png"
        : fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")
        ? "image/jpeg"
        : fileName.endsWith(".svg")
        ? "image/svg+xml"
        : fileName.endsWith(".gif")
        ? "image/gif"
        : fileName.endsWith(".bmp")
        ? "image/bmp"
        : "application/octet-stream";

      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setImageName(fileName);
      setIsImageLoading(false);
      toast({
        title: "Thumbnail uploaded successfully",

      });
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading thumbnail", variant: "destructive" });
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleImage(blob, file.name);
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading image", variant: "destructive" });
    }
  };

  return (
    <div className="w-full flex-wrap">
      <div className="flex-center h-[150px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed bg-white" onClick={() => imageRef?.current?.click()}>
        <Input
          type="file"
          className="hidden"
          ref={imageRef}
          onChange={(e) => uploadImage(e)}
        />
        {!isImageLoading ? (
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
          <h2 className="text-12">Upload image</h2>
          <p className="text-xs">
            SVG, PNG, JPG, or GIF (max. 2MB)
          </p>
        </div>
      </div>

      {imageName && (
        <div className="w-full">
          <p className="mt-5 text-sm">
            {imageName}
          </p>
        </div>
      )}

      {!imageName && image && (
        <div className="flex-center w-full">
          <p className="mt-5 text-sm">{image.slice(0, 30)}</p>
        </div>
      )}
    </div>
  );
};

export default UploadProfileImage;