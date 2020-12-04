interface Props {
  from: number;
  to: number;
  currency: string;
}

export const Salary = ({ from, to, currency }: Props) => {
  if (!from && !to) {
    return <span>Nie podano stawki</span>;
  }

  const parts = [];
  if (from) {
    parts.push(from);
  }
  if (from && to) {
    parts.push(' - ');
  }
  if (to) {
    parts.push(to);
  }
  if (currency) {
    parts.push(` ${currency.toUpperCase()}`);
  }
  return <span>{parts.join('')}</span>;
};
