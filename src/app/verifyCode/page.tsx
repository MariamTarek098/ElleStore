'use client';
import React, { useState } from 'react';
import { Mail, KeyRound, Lock, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { verifyResetCode, forgotPasswords } from '../forgetPassword/pass.action'; 

export default function VerifyCodeView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false); 
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const resetCode = formData.get('resetCode') as string;

    try {
      const data = await verifyResetCode({ resetCode });
      if (data.status === "Success" || data.statusMsg === "success") {
        toast.success("Code verified successfully!");
        router.push(`/resetPassword?email=${email}`);
      } else {
        toast.error(data.message || "Invalid or expired reset code");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    if (!email) {
      toast.error("Email not found. Please start over.");
      return;
    }

    setIsResending(true);
    try {
      const data = await forgotPasswords({ email });
      if (data.statusMsg === "success") {
        toast.success("A new code has been sent to your email");
      } else {
        toast.error(data.message || "Failed to resend code");
      }
    } catch (error) {
      toast.error("Error resending code");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm w-full max-w-lg space-y-8">

        <div className="text-center space-y-3">
          <div className="flex items-center justify-center text-3xl font-bold">
            <span className="text-[#50829F]">Elle</span>
            <span className="text-slate-950">Store</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-950">Check Your Email</h1>
          <p className="text-slate-500 text-sm">
            Enter the 6-digit code sent to <span className="font-semibold text-slate-800">{email}</span>
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center gap-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#50829F]/10 text-[#50829F] border border-green-200">
              <Mail className="w-5 h-5" />
            </div>
            <div className="w-20 h-px bg-green-200"></div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#50829F]/10 text-[#50829F] ring-2 ring-[#50829F] ring-offset-2 ring-offset-white">
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="w-20 h-px bg-slate-200"></div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400">
              <Lock className="w-5 h-5" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="resetCode" className="block text-sm font-medium text-slate-700">
              Verification Code
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                id="resetCode"
                name="resetCode"
                type="text" 
                required
                placeholder="Enter 6-digit code"
                className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#50829F] focus:ring-2 focus:ring-[#50829F]/20 transition-all text-slate-900 placeholder:text-slate-400 text-center tracking-[0.5em] font-bold"
                maxLength={6}
              />
            </div>

            <div className="text-center">
               <button 
                type="button" 
                disabled={isResending}
                onClick={handleResend}
                className="text-sm text-[#50829F] hover:underline disabled:text-slate-400 disabled:no-underline flex items-center justify-center gap-2 w-full mt-2"
               >
                 {isResending ? (
                   <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Sending...
                   </>
                 ) : (
                   "Didn't receive the code? Resend Code"
                 )}
               </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#50829F] hover:bg-[#426c85] text-white py-3 rounded-xl transition-all font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Verify Code
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/forgetPassword" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#50829F] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Change email address
          </Link>
        </div>
      </div>
    </div>
  );
}