import { z } from 'zod';
const passwordValidation = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);


export const signupSchema = z.object({
    // picture: z.any().refine((file) => file, "Please upload file"),
    username: z.string().min(1, { message: 'Must have at least 1 character' }),
    email: z
        .string()
        .min(1, { message: 'Must have at least 1 character' })
        .email({
            message: 'Must be a valid email',
        }),
    password: z
        .string()
        .min(6, { message: 'Must have at least 6 character' })
        .regex(passwordValidation, {
            message: 'Your password is not valid',
        }),

})
export const signinSchema = z.object({
    // picture: z.any().refine((file) => file, "Please upload file"),
    email: z
        .string()
        .min(1, { message: 'Must have at least 1 character' })
        .email({
            message: 'Must be a valid email',
        }),
    password: z
        .string()
        .min(6, { message: 'Must have at least 6 character' })
        .regex(passwordValidation, {
            message: 'Your password is not valid',
        }),

})

export const profileSchema = z.object({
    profileImg: z.any().refine((file) => file, "Please upload file"),
    username: z.string().min(1, { message: 'Must have at least 1 character' }),
    email: z
        .string()
        .min(1, { message: 'Must have at least 1 character' })
        .email({
            message: 'Must be a valid email',
        }),
    password: z
        .string()
        .min(6, { message: 'Must have at least 6 character' })
        .regex(passwordValidation, {
            message: 'Your password is not valid',
        }),

})