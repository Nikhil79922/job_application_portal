import cloudinary from "cloudinary";

export const uploadToCloudinary = async (
  buffer: any,
  public_id?: string
) => {
  if (public_id) {
    await cloudinary.v2.uploader.destroy(public_id);
  }

  const cloud = await cloudinary.v2.uploader.upload(buffer)

  return {
    url: cloud.secure_url,
    public_id: cloud.public_id,
  };
};