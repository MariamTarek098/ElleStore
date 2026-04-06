import * as zod from 'zod';

export const loginSchema = zod
  .object({
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
  })