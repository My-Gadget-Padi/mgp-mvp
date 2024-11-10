import { Dispatch, SetStateAction } from "react";

import { Id } from "@/convex/_generated/dataModel";

export interface EmptyStateProps {
  title: string;
  search?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export interface UploadDeviceImageOrVideoProps {
  setFile: Dispatch<SetStateAction<string>>;
  setFileStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  file: string;
  setContentType: Dispatch<SetStateAction<string>>;
};

export interface UploadProfileImageProps {
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  image: string;
}