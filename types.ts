
export type Theme = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  primaryRgb: string;
  secondaryRgb: string;
};

export type DailyStats = {
  [date: string]: number; // date format: "YYYY-MM-DD"
};

export type ChartData = {
  day: string;
  minutes: number;
};
