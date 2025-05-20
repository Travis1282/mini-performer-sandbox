export interface ImageApiParams {
  fit?: string;
  height?: number;
  quality?: number;
  trim?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
  width?: number;
}
