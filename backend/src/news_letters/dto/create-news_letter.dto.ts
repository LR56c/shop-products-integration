import { z } from 'zod';

export const createNewsletterSchema = z
	.object({
		email: z.string().email(),
		name: z.string(),
		createAt: z.date()
	})
	.required();

export type CreateNewsLetterDto = z.infer<typeof createNewsletterSchema>;
