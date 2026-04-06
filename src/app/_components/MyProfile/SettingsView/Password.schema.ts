import * as zod from 'zod';

export const PasswordSchema = zod.object({
  currentPassword: zod.string().min(1, "Current password is required"),
  password: zod
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{5,}$/,
      "Use 5+ chars with number & special character"
    ),
  rePassword: zod.string().min(1, "Confirm your password"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"], 
});