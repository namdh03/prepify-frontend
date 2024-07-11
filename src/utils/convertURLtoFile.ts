import { UploadedFile } from "~contexts/recipe/recipe.type";

const urlToFile = async (url: string, fileName: string): Promise<UploadedFile> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new UploadedFile([blob], fileName, url);
  return file;
};
export const convertUrlsToFiles = async (urls: string[]): Promise<UploadedFile[]> => {
  return Promise.all(urls.map((url, index) => urlToFile(url, `image-${index}`)));
};
