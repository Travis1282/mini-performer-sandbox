export type Sizes = 'lg' | 'sm';

export type Variants =
  | 'green'
  | 'outline-solid'
  | 'primary'
  | 'quaternary'
  | 'secondary'
  | 'tertiary';

export type Colors =
  | 'accent'
  | 'black'
  | 'dark'
  | 'error'
  | 'light'
  | 'success'
  | 'warning'
  | 'white';

export type TypoTypes = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'text';

export type DropdownArrowPosition = 'center' | 'left' | 'right';

export interface LinkGroup {
  links: {
    title: string;
    href: string;
  }[];
  title: string;
}

export type Arrows = 'down' | 'left' | 'right' | 'up';

export const Display = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const DisplaySizes: [string, number][] = [
  ['sm', 640],
  ['md', 768],
  ['lg', 1024],
  ['xl', 1280],
  ['2xl', 1536],
];

export interface NavbarCategory {
  children?: NavbarCategory[];
  id?: number;
  title?: string;
  url: string;
}
