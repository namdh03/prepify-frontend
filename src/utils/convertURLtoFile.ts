interface UploadedFile extends File {
  preview: string;
}

const urlToFile = async (url: string, fileName: string): Promise<UploadedFile> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return Object.assign(file, { preview: url });
};

export const convertUrlsToFiles = async (urls: string[]): Promise<UploadedFile[]> => {
  return Promise.all(urls.map((url, index) => urlToFile(url, `image-${index}`)));
};
