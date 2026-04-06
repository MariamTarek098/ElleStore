"use client";
import React, { useState } from "react";
import { User, Loader2, Eye, EyeOff, Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateProfile, updatePassword } from "./Settings.action";
import { PassInputs, ProfileInputs } from "@/interfaces/product.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "./Password.schema";

export default function SettingsView() {
  const { data: session } = useSession();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPassLoading, setIsPassLoading] = useState(false);

  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  //  Profile Form
  const { register: registerProfile, handleSubmit: handleSubmitProfile } =
    useForm<ProfileInputs>({
      values: {
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
      },
    });

  // Password Form
  const {
    register: regPass,
    handleSubmit: handlePassSubmit,
    reset: resetPass,
    formState: { errors: passErrors },
  } = useForm<PassInputs>({
    resolver: zodResolver(PasswordSchema),
  });

  // Profile Update Handler
  const onUpdateProfile = async (values: ProfileInputs) => {
    setIsProfileLoading(true);
    try {
      const data = await updateProfile(values);

      if (data.status === "success") {
        toast.success("Profile Updated Successfully");
      } else {
        const errorMessage =
          data.errors?.msg || data.message || "Update failed";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  // Password Update Handler
  const onUpdatePassword = async (values: PassInputs) => {
    setIsPassLoading(true);
    try {
      const data = await updatePassword(values);

      if (data.statusMsg === "success" || data.message === "success") {
        toast.success("Password Updated Successfully");
        resetPass();
      } else {
        const errorMessage =
          data.errors?.msg || data.message || "Failed to change password";

        toast.error(errorMessage);
        console.log("Captured Error:", errorMessage);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPassLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
        <p className="text-sm text-slate-500">
          Update your profile information
        </p>
      </div>

      {/*  Profile Info Form  */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#50829F]/10 p-3 rounded-full text-[#50829F]">
            <User className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Profile Information</h3>
        </div>

        <form
          onSubmit={handleSubmitProfile(onUpdateProfile)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              {...registerProfile("name")}
              type="text"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#50829F] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              {...registerProfile("email")}
              type="email"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#50829F] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              {...registerProfile("phone")}
              type="tel"
              placeholder="01xxxxxxxxx"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#50829F] transition-all"
            />
          </div>
          <button
            disabled={isProfileLoading}
            type="submit"
            className="bg-[#50829F] hover:bg-[#426c85] text-white px-6 py-2.5 rounded-xl transition-colors font-medium text-sm flex items-center gap-2 disabled:opacity-50"
          >
            {isProfileLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : null}
            Save Profile
          </button>
        </form>
      </div>

      {/*  Change Password Form  */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-100 p-3 rounded-full text-orange-500">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Change Password</h3>
            <p className="text-xs text-slate-500">
              Update your account password
            </p>
          </div>
        </div>

        <form
          onSubmit={handlePassSubmit(onUpdatePassword)}
          className="space-y-4"
        >
          {/* Current Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Current Password
            </label>
            <input
              {...regPass("currentPassword")}
              type={showPass.current ? "text" : "password"}
              className={`w-full border ${passErrors.currentPassword ? "border-red-500" : "border-slate-200"} rounded-xl px-4 py-2.5 outline-none focus:border-[#50829F] transition-all pr-10`}
            />
            <button
              type="button"
              onClick={() =>
                setShowPass({ ...showPass, current: !showPass.current })
              }
              className="absolute right-4 top-9 text-slate-400"
            >
              {showPass.current ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
            {passErrors.currentPassword && (
              <p className="text-[10px] text-red-500 mt-1">
                {passErrors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              New Password
            </label>
            <input
              {...regPass("password")}
              type={showPass.new ? "text" : "password"}
              className={`w-full border ${passErrors.password ? "border-red-500" : "border-slate-200"} rounded-xl px-4 py-2.5 outline-none focus:border-[#50829F] transition-all pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPass({ ...showPass, new: !showPass.new })}
              className="absolute right-4 top-9 text-slate-400"
            >
              {showPass.new ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
            {passErrors.password && (
              <p className="text-[10px] text-red-500 mt-1">
                {passErrors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <input
              {...regPass("rePassword")}
              type={showPass.confirm ? "text" : "password"}
              className={`w-full border ${passErrors.rePassword ? "border-red-500" : "border-slate-200"} rounded-xl px-4 py-2.5 outline-none focus:border-[#50829F] transition-all pr-10`}
            />
            <button
              type="button"
              onClick={() =>
                setShowPass({ ...showPass, confirm: !showPass.confirm })
              }
              className="absolute right-4 top-9 text-slate-400"
            >
              {showPass.confirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
            {passErrors.rePassword && (
              <p className="text-[10px] text-red-500 mt-1">
                {passErrors.rePassword.message}
              </p>
            )}
          </div>

          <button
            disabled={isPassLoading}
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl transition-all font-medium text-sm flex items-center gap-2 disabled:opacity-50"
          >
            {isPassLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
