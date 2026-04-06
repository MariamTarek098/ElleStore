import * as zod from 'zod';

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Minimum 3 characters")
      .max(13, "Maximum 13 characters"),

    email: zod
      .string()
      .nonempty("Email is required")
      .email("Invalid email format"),

    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{5,}$/,
        "Use 5+ chars with number & special character"
      ),

    rePassword: zod
      .string()
      .nonempty("Confirm your password"),

    phone: zod
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0125][0-9]{8}$/, "Enter valid Egyptian number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });