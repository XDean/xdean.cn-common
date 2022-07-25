import { z } from 'zod';
import { stringToBoolean } from './base';

export const zex = {
  str: {
    date: z.string().transform<Date>(s => new Date(s)).or(z.date()),
    int: z.string().transform<number>(s => Number(s)).or(z.number().int()),
    boolean: z.string().transform<boolean>(s => stringToBoolean(s)).or(z.boolean()),
  },
};