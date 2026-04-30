export type DataPoint = {
  color?: string;
  label: string;
  secondaryValue?: number;
  value: number;
};

export type SeriesData = {
  color: string;
  data: DataPoint[];
  name: string;
};

export type ChartTheme = {
  accentColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;
  cardBorderColor: string;
  gridColor: string;
  negativeColor: string;
  positiveColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
};

export const defaultDarkTheme: ChartTheme = {
  accentColor: "#3b82f6",
  backgroundColor: "#0a0a14",
  cardBackgroundColor: "#141420",
  cardBorderColor: "#2a2a3a",
  gridColor: "#2a2a3a",
  negativeColor: "#ef4444",
  positiveColor: "#22c55e",
  primaryTextColor: "#ffffff",
  secondaryTextColor: "#a0a0b0",
};

export type BaseChartProps = {
  animationDuration?: number;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  cardBorderRadius?: number;
  cardPadding?: number;
  easing?: [number, number, number, number];
  fontFamily?: string;
  showCard?: boolean;
  theme?: Partial<ChartTheme>;
  title?: string;
  titleColor?: string;
};
