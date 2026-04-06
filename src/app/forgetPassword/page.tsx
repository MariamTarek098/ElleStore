'use client';
import React from 'react';
import { Mail, KeyRound, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { forgotPasswords } from './pass.action';
import toast from 'react-hot-toast';

export default function ForgetPasswordView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault(); 
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const email = formData.get('email') as string;

  try {
    const data = await forgotPasswords({ email }); 
    
    if (data.statusMsg === "success") {
      toast.success(data.message || "Reset code sent!");
      setTimeout(() => {
  router.push(`/verifyCode?email=${email}`);
}, 2000);
    } else {
      toast.error(data.message || "There is no user registered with this email address");
    }
  } catch (error) {
    toast.error("An error occurred");
  } finally {
    setIsLoading(false);
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
          <h1 className="text-2xl font-bold text-slate-950">Forgot Password?</h1>
          <p className="text-slate-500 text-sm">No worries, we'll send you a reset code</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#50829F]/10 text-[#50829F] ring-2 ring-[#50829F] ring-offset-2 ring-offset-white">
              <Mail className="w-5 h-5" />
            </div>
            <div className="w-20 h-px bg-slate-200"></div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400">
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
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                id="email"
                name="email"
                type="email" 
                required
                placeholder="Enter your email address"
                className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#50829F] focus:ring-2 focus:ring-[#50829F]/20 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#50829F] hover:bg-[#426c85] text-white py-3 rounded-xl transition-all font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : null}
            Send Reset Code
          </button>
        </form>
          <div className="text-center pt-2">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm text-[#50829F] hover:text-[#426c85] font-medium transition-colors">
          
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
          
            </Link>
          </div>
      </div>
    </div>
  );
}