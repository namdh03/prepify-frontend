import { ImageType } from "~utils/enums";
import http from "~utils/http";

export const uploadImages = (entityId: string, type: ImageType, files: FileList | File[]) => {
  const formData = new FormData();

  formData.append("entityId", entityId);
  formData.append("type", type);

  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  return http.post("/upload/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
