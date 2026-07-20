import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import userAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = userAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => { console.log(res.user); navigate(location?.state || "/"); })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="space-y-6">
      <title>MK Sports | Login</title>
      <div>
        <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">Welcome Back</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Sign In</h1>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <div>
          <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5 block">Email</label>
          <input type="email" {...register("email", { required: true })}
            className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
            placeholder="you@example.com" />
          {errors.email?.type === "required" && <p className="text-red-500 text-xs mt-1">Email is required</p>}
        </div>

        <div>
          <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5 block">Password</label>
          <input type="password" {...register("password", { required: true, minLength: 6 })}
            className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
            placeholder="Enter your password" />
          {errors.password?.type === "minLength" && <p className="text-red-500 text-xs mt-1">Password must be 6+ characters</p>}
        </div>

        <div className="text-right">
          <a className="text-[11px] text-gray-400 hover:text-black cursor-pointer tracking-wider uppercase">Forgot password?</a>
        </div>

        <button type="submit" className="w-full py-3.5 bg-black text-white text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#C8102E] transition-colors">
          Sign In
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
        <div className="relative flex justify-center text-sm"><span className="bg-white px-4 text-gray-300 text-[11px] tracking-wider uppercase">or</span></div>
      </div>

      <SocialLogin />

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link state={location.state} className="text-[#C8102E] font-semibold hover:text-red-800" to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
