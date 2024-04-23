import { z } from 'zod';

export const getAllNewsletterSchema = z
	.object({
		limit: z.number().int()
	})
	.required();

export type GetAllNewsLetterDto = z.infer<typeof getAllNewsletterSchema>;
