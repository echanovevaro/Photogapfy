import {z} from 'zod';

export const passwordSchema = z.object({
     email: z.string().min(1, 'required').email('invalid email address'),
    });

export const loginSchema = passwordSchema.extend({
    password: z.string().min(6 , 'must be at least 6 characters'),
    });

export const registerSchema = loginSchema.extend({
    password2: z.string().min(6 , 'must be at least 6 characters'),
    displayName: z.string().min(1, 'required').max(15, 'must be 15 characters or less'),
    avatarUrl: z.string().min(1, 'required').url('invalid url'),
    photoUrl: z.string().min(1, 'required').url('invalid url'),
    description: z.string().min(3, 'required at least 3 characters').max(200, 'must be 200 characters or less'),
    }).refine((data) => data.password === data.password2, {
        message: "Passwords don't match",
        path: ["password2"],
    });