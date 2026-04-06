"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdPhone,
  MdOutlineVerifiedUser,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import * as zod from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./register.schema";
import { RegisterAction } from "./register.actions";
import { useRouter } from "next/navigation";

export type RegisterObjectType = zod.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const { control, handleSubmit } = useForm<RegisterObjectType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: RegisterObjectType) {
    const result = await RegisterAction(data);

    if (result?.success) {
      toast.success(result.message);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast.error(result?.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#50829f]/5">
      <Card className="w-full max-w-md md:max-w-2xl rounded-2xl shadow-xl border-t-4 border-t-[#50829f]">
        <CardContent className="p-6 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#50829f]">
              Create Account
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Start your journey with us
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-foreground/80">Name</Label>

                    <div className="relative">
                      <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-[#50829f]" />

                      <Input
                        {...field}
                        placeholder="Ali"
                        className={`pl-10 focus-visible:ring-[#50829f] ${
                          fieldState.invalid
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      />
                    </div>

                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="md:col-span-2 space-y-2">
                    <Label>Email</Label>

                    <div className="relative">
                      <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#50829f]" />

                      <Input
                        {...field}
                        type="email"
                        placeholder="ali@example.com"
                        className={`pl-10 focus-visible:ring-[#50829f] ${
                          fieldState.invalid
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      />
                    </div>

                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#50829f]" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`pl-10 pr-10 focus-visible:ring-[#50829f] ${
                          fieldState.invalid
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#50829f]"
                      >
                        {showPassword ? (
                          <MdVisibilityOff size={20} />
                        ) : (
                          <MdVisibility size={20} />
                        )}
                      </button>
                    </div>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Confirm Password */}
              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label>Confirm</Label>
                    <div className="relative">
                      <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#50829f]" />
                      <Input
                        {...field}
                        type={showRePassword ? "text" : "password"}
                        placeholder="Confirm"
                        className={`pl-10 pr-10 focus-visible:ring-[#50829f] ${
                          fieldState.invalid
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRePassword(!showRePassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#50829f]"
                      >
                        {showRePassword ? (
                          <MdVisibilityOff size={20} />
                        ) : (
                          <MdVisibility size={20} />
                        )}
                      </button>
                    </div>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Phone */}
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="md:col-span-2 space-y-2">
                    <Label>Phone</Label>

                    <div className="relative">
                      <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#50829f]" />

                      <Input
                        {...field}
                        type="tel"
                        placeholder="+20 123 456 789"
                        className={`pl-10 focus-visible:ring-[#50829f] ${
                          fieldState.invalid
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      />
                    </div>

                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Submit */}
            <Button className="w-full flex gap-2 bg-[#50829f] hover:bg-[#3d637a] text-white">
              <MdOutlineVerifiedUser />
              Create Account
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#50829f] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
