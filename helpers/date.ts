import { format as formatFn } from 'date-fns';
import { pl } from 'date-fns/locale';

export const format = (date: Date, formatString: string) => {
  return formatFn(date, formatString, { locale: pl });
};
