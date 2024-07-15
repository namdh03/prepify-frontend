import { ImageType } from "~utils/enums";

export type DeleteImagesBody = {
  url?: string;
  entityId: string;
  type: ImageType;
};
