export const TimeOptions = ['Day/Night', 'Day', 'Night'] as const;
export type TimeByType = (typeof TimeOptions)[number];

export const HomeAndAwayOptions = ['Home & Away', 'Home games', 'Away games'] as const;
export type HomeAndAwayType = (typeof HomeAndAwayOptions)[number];
