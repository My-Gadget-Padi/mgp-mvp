import { Dispatch, SetStateAction } from "react";

import { Id } from "@/convex/_generated/dataModel";

export interface EmptyStateProps {
  title: string;
  search?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export interface UploadDeviceImageOrVideoProps {
  setVideo: Dispatch<SetStateAction<string>>;
  setVideoStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  video: string;
}