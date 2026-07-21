import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";

const EditProfile = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Upload image to ImgBB
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoURL = user?.photoURL || "";

      if (image) {
        photoURL = await uploadImage(image);
      }

      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      toast.success("Profile updated successfully 🎉");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      <form onSubmit={handleUpdateProfile} className="space-y-5">
        {/* Preview */}
        <div className="flex justify-center">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt="Profile Preview"
            className="w-28 h-28 rounded-full object-cover border-4 border-amber-400"
          />
        </div>

        {/* Name */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>

          <input
            type="text"
            className="input input-bordered w-full focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Upload Image */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Profile Photo</span>
          </label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn bg-amber-400 hover:bg-amber-500 text-black w-full"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
