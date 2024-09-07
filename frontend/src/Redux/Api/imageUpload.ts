import axios from "axios";

const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET ?? "");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData,
      {
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const imageUrl = response.data.secure_url;
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};

export default uploadImageToCloudinary;
