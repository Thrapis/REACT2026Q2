import { COUNTRIES } from '@/constants/Countries';
import { z } from 'zod';

const MAX_IMAGE_BYTE_SIZE = 2_097_152;
const byteSizeToBase64Length = (bytes: number) => (bytes / 3) * 4;
const MAX_IMAGE_BASE64_LENGTH = byteSizeToBase64Length(MAX_IMAGE_BYTE_SIZE);

export const SumbittedFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .refine((val) => val[0]?.toUpperCase() === val[0], {
        message: 'First letter must be uppercase',
      }),
    age: z
      .number()
      .refine((val) => !isNaN(val), { message: 'Age is required' })
      .nonnegative('Age cannot be negative'),
    email: z.email('Please provide a valid email address'),
    gender: z.enum(['Unknown', 'Male', 'Female'], {
      error: 'Please select gender',
    }),
    termsAndConditions: z.boolean().refine((val) => val === true, {
      message: 'You must accept Terms and Conditions',
    }),
    image: z
      .string()
      .min(1, 'Image is required')
      .refine(
        (val) =>
          val.startsWith('data:image/png') || val.startsWith('data:image/jpeg'),
        { message: "Image must be 'png' or 'jpeg'" }
      )
      .max(MAX_IMAGE_BASE64_LENGTH, 'Image size must be less than 2 MB'),
    password: z
      .string()
      .min(1, 'Password is required')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    country: z.enum(COUNTRIES, 'Enter correct country name'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password is not the same as Confirm Password',
    path: ['confirmPassword'],
  });
