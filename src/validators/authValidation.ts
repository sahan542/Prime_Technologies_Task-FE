// src/validators/authValidation.ts
import { z } from "zod";

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[@#$%^&+=!?.*_\-]).{8,}$/;
// at least 1 uppercase, at least 1 special, min length 8

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter (A–Z)"
    )
    .regex(
      /[@#$%^&+=!?.*_\-]/,
      "Password must contain at least one special character (@, #, $, %, ^, &, +, =, !, ?, ., *, _, -)"
    ),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type SignupValues = z.infer<typeof signupSchema>;

export type SignupErrors = Partial<Record<keyof SignupValues, string>>;

export function validateSignup(values: SignupValues): SignupErrors {
  const result = signupSchema.safeParse(values);
  if (result.success) return {};
  const errors: SignupErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof SignupValues;
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}

// Validate a single field on blur (uses current full values for cross-field checks)
export function validateField<K extends keyof SignupValues>(
  field: K,
  values: SignupValues
): string | undefined {
  const errs = validateSignup(values);
  return errs[field];
}
