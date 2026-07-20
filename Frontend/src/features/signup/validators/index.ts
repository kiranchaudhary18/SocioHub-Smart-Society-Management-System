import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const societyAdminSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  password: passwordSchema,
  confirmPassword: z.string(),
  societyName: z.string().min(3, "Society name must be at least 3 characters").max(200),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms"
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SocietyAdminFormData = z.infer<typeof societyAdminSchema>;

export const residentSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  password: passwordSchema,
  confirmPassword: z.string(),
  societyCode: z.string().min(4, "Invalid Society Code").toUpperCase(),
  flatNumber: z.string().min(1, "Flat number is required").max(10),
  residentType: z.enum(["OWNER", "TENANT"]),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms"
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ResidentFormData = z.infer<typeof residentSchema>;
