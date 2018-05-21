export type Formater = (dt: {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
}) => string;

export default function strftime(time: number, format: Formater = defaultFormat) {
  const newDate = new Date(time);
  const date = {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1,
    date: newDate.getDate(),
    hour: newDate.getHours(),
    minute: newDate.getMinutes(),
    second: newDate.getSeconds()
  };
  return format(date);
};

const defaultFormat: Formater = ({ year, month, date, hour, minute }) => `${year}年${month}月${date}日 ${hour}:${minute}`;