export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  url: string;
  [key: string]: any;
};

export async function uploadToCloudinary(
  file: File,
  {
    cloudName = "dtzx6gxfh", 
    uploadPreset = "mern_profile",
    folder = "profile_pics",
  }: { cloudName?: string; uploadPreset?: string; folder?: string } = {}
): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  if (folder) formData.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Cloudinary upload failed: ${errText}`);
  }

  return res.json();
}
