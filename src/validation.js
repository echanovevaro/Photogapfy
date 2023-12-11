import {z} from 'zod';

export const passwordSchema = z.object({
     email: z.string().min(1, 'required').email('invalid email address'),
    });

export const loginSchema = passwordSchema.extend({
    password: z.string().min(6 , 'must be at least 6 characters'),
    });

export const registerSchema = loginSchema.extend({
    password2: z.string().min(6 , 'must be at least 6 characters'),
    }).refine((data) => data.password === data.password2, {
        message: "Passwords don't match",
        path: ["password2"],
    });

export const userSchema = z.object({
    displayName: z.string().min(3, 'required at least 3 characters'),
    avatarUrl: z.string().min(1, 'required').url('invalid URL'),
    photoUrl: z.string().min(1, 'required').url('invalid URL'),
    experience: z.enum(['junior', 'senior', 'pro'], {
        errorMap: (issue, ctx) => ({ message: 'select one experience option' })
    }),
    salary: z.coerce.number('number expected').min(1, 'required positive number'),
    intro: z.string().min(1, 'required').max(100, 'max 100 characters'),
    description: z.string().min(1, 'required').max(500, 'max 500 characters'),
});

export const userExtendedSchema = userSchema.extend({
    skills: z.array(z.string().min(3, 'skill must have 3 characters at least')).nonempty('required at least one skill'),
    gallery: z.array(z.string().min(1, 'photo url required').url('invalid URL')).nonempty('required at least one image'),
});