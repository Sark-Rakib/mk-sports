import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxios";
import { toast } from "react-toastify";
import { MdOutlineRateReview } from "react-icons/md";

const CustomerReview = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
      { method: "POST", body: formData },
    );

    const data = await res.json();
    return data.data.url;
  };

  const onSubmit = async (data) => {
    try {
      const imageUrl = data.image ? await uploadImage(data.image[0]) : null;
      const reviewData = {
        name: data.name,
        rating: parseInt(data.rating),
        image: imageUrl,
        message: data.message,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/reviews", reviewData);

      if (res.data.insertedId) {
        toast.success("Review submitted successfully ❤️");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong!", error);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-5 py-20">
      <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
        <MdOutlineRateReview /> Customer{" "}
        <span className="text-[#aba65e]">Review</span>
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        {/* Name */}
        <div>
          <label className="font-medium text-black">Your Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full mt-1 input input-bordered outline-none border-gray-400"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="font-medium text-black">Rating</label>
          <select
            {...register("rating", { required: true })}
            className="w-full mt-1 select select-bordered outline-none border-gray-400"
          >
            <option value="">Select rating</option>
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </select>
          {errors.rating && (
            <p className="text-red-500 text-sm">Rating is required</p>
          )}
        </div>

        {/* image */}
        <div>
          <label className="font-medium text-black">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full mt-1 file-input file-input-bordered border-gray-400"
          />
        </div>

        {/* Message */}
        <div>
          <label className="font-medium text-black">Your Review</label>
          <textarea
            {...register("message", { required: true })}
            className="w-full mt-1 textarea textarea-bordered outline-none border-gray-400"
            placeholder="Write your review..."
            rows="4"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">Review is required</p>
          )}
        </div>

        <button className="w-full bg-[#aba65e] hover:bg-[#8a854d] text-white py-2 rounded-lg font-semibold">
          Submit Review
        </button>
      </form>
    </section>
  );
};

export default CustomerReview;
