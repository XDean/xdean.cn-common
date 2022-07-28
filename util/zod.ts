import {z} from 'zod';

export const zex = {
  str: {
    date: z.union([
      z.date(),
      z.string()
        .refine((e) => new Date(e).getTime() >= 0, 'not valid date string')
        .transform<Date>((e) => new Date(e)),
    ]),
    number: z.union([
      z.number(),
      z.string()
        .refine((e) => !Number.isNaN(Number(e)), 'not valid number string')
        .transform<number>((e) => Number(e)),
    ]),
    int: z.union([
      z.number().int(),
      z.string()
        .refine((e) => Number.isSafeInteger(Number(e)), 'not valid int string')
        .transform<number>((e) => Number(e)),
    ]),
  },
};
