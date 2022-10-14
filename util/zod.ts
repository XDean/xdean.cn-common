import {z, ZodDefault} from 'zod';
import {ZodType} from 'zod/lib/types';
import {stringToBoolean} from './base';

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
    boolean: z.union([
      z.boolean(),
      z.string().transform<boolean>(s => stringToBoolean(s)),
    ]),
  },
  parse: {
    default: <T>(type: ZodDefault<ZodType<T>>, data: unknown): T => {
      try {
        return type.parse(data);
      } catch (e) {
        return type.parse(undefined);
      }
    },
    json: <T>(type: ZodDefault<ZodType<T>>, data: string) => {
      try {
        return zex.parse.default(type, JSON.parse(data));
      } catch (e) {
        return type.parse(undefined);
      }
    },
  },
};
