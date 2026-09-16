import { z } from 'zod';

const httpUrlSchema = z
    .url("Please enter a valid URL")
    .refine(
        (value) => {
            try {
                const url = new URL(value);
                return url.protocol === 'http:' || url.protocol === 'https:';
            } catch {
                return false;
            }
        },
        {
            message: "URL must start with http:// or https://",
        }
);
    
export const createUrlSchema = z.object({
    body: z.object({
        originalUrl: httpUrlSchema,
        expiresAt: z.string().datetime().optional().nullable(), 
    }),
});

export type CreateUrlBody = z.infer<typeof createUrlSchema>['body'];