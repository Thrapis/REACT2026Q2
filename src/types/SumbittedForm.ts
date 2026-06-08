import { SumbittedFormSchema } from '@/schemas/SumbittedForm.schema';
import z from 'zod';

export type SumbittedForm = z.infer<typeof SumbittedFormSchema>;
