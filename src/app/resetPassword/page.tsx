'use client';
import React, { useState } from 'react';
import { Mail, KeyRound, Lock, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { resetPassword } from '../forgetPassword/pass.action';

// Schema
const resetSchema = z.object({
  newPassword: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{5,}$/,
      "Use 5+ chars with number & special character"
    ),
  confirmPassword: z
    .string()
    .min(1, "Confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], 
});

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPasswordView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (values: ResetFormData) => {
    setIsLoading(true);

    try {
      const data = await resetPassword({ 
        email, 
        newPassword: values.newPassword 
      });
      
      if (data.token) {
        toast.success("Password reset successfully!");
        router.push('/login');
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm w-full max-w-lg space-y-8">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center text-3xl font-bold">
            <span className="text-[#50829F]">Elle</span>
            <span className="text-slate-950">Store</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-950">Create New Password</h1>
          <p className="text-slate-500 text-sm">Your new password must be different from previous passwords</p>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center gap-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#50829F]/10 text-[#50829F]">
              <Mail className="w-5 h-5" />
            </div>
            <div className="w-16 h-px bg-green-500"></div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#50829F]/10 text-[#50829F]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="w-16 h-px bg-green-500"></div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#50829F]/10 text-[#50829F] ring-2 ring-[#50829F] ring-offset-2">
              <Lock className="w-5 h-5" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

{/* New Password */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-slate-700">New Password</label>
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        {...register("newPassword")}
        type={showNewPassword ? "text" : "password"} // Use showNewPassword
        placeholder="Enter new password"
        className={`w-full border ${errors.newPassword ? "border-red-500" : "border-slate-200"} rounded-xl pl-12 pr-12 py-3 outline-none focus:border-[#50829F] transition-all`}
      />
      <button
        type="button"
        onClick={() => setShowNewPassword(!showNewPassword)} // Toggle showNewPassword
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
      >
        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
    {errors.newPassword && (
      <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>
    )}
  </div>

  {/* Confirm Password */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-slate-700">Confirm Password</label>
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        {...register("confirmPassword")}
        type={showConfirmPassword ? "text" : "password"} // Use showConfirmPassword
        placeholder="Confirm new password"
        className={`w-full border ${errors.confirmPassword ? "border-red-500" : "border-slate-200"} rounded-xl pl-12 pr-12 py-3 outline-none focus:border-[#50829F] transition-all`}
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle showConfirmPassword
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
      >
        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
    {errors.confirmPassword && (
      <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
    )}
  </div>

    <button

            disabled={isLoading}

            type="submit"

            className="w-full bg-[#50829F] hover:bg-[#426c85] text-white py-3 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-70"

          >

            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}

            Reset Password

          </button>
          
        </form>

        <div className="text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#50829F]">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}