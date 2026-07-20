import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxios";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        reset();
        const formData = new FormData();
        formData.append("image", profileImg);
        const img_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
        axios.post(img_Api_Url, formData).then((res) => {
          const photoURL = res.data.data.url;
          const userProfile = { displayName: data.name, photoURL };
          const userInfo = { email: data.email, displayName: data.name, photoURL };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.acknowledged && res.data.insertedId) console.log("User created in the DB:", res.data.insertedId);
            else if (res.data.message === "user exists") console.log("User already exists in DB");
          });
          updateUserProfile(userProfile).then(() => navigate(location?.state || "/")).catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="space-y-5">
      <title>MK Sports | Register</title>
      <div>
        <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">Get Started</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Create Account</h1>
      </div>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        <div>
          <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5 block">Name</label>
          <input type="text" {...register("name", { required: true })}
            className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors" placeholder="Your Name" />
          {errors.name?.type === "required" && <p className="text-red-500 text-xs mt-1">Name is required</p>}
        </div>
        <div>
          <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5 block">Photo</label>
          <input type="file" {...register("photo", { required: true })}
            className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors file:mr-4 file:py-1 file:px-4 file:border-0 file:text-[11px] file:font-semibold file:tracking-wider file:uppercase file:bg-gray-900 file:text-white hover:file:bg-[#C8102E]" />
          {errors.photo?.type === "required" && <p className="text-red-500 text-xs mt-1">Photo is required</p>}
        </div>
        <div>
          <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5 block">Email</label>
          <input type="email" {...register("email", { required: true })}
            className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors" placeholder="you@example.com" />
          {errors.email?.type === "required" && <p className="text-red-500 text-xs mt-1">Email is required</p>}
        </div>
        <div>
          <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5 block">Password</label>
          <input type="password" {...register("password", {
            required: true, minLength: 6,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          })}
            className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors" placeholder="Create a password" />
          {errors.password?.type === "required" && <p className="text-red-500 text-xs mt-1">Password is required</p>}
          {errors.password?.type === "minLength" && <p className="text-red-500 text-xs mt-1">Must be 6+ characters</p>}
          {errors.password?.type === "pattern" && <p className="text-red-500 text-xs mt-1">Must include uppercase, lowercase, number, and special character</p>}
        </div>

        <button type="submit" className="w-full py-3.5 bg-black text-white text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#C8102E] transition-colors">
          Create Account
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
        <div className="relative flex justify-center text-sm"><span className="bg-white px-4 text-gray-300 text-[11px] tracking-wider uppercase">or</span></div>
      </div>

      <SocialLogin />

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link state={location.state} className="text-[#C8102E] font-semibold hover:text-red-800" to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;
