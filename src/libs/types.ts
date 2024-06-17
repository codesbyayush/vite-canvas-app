export enum tools {
  Pencil,
  Line,
  Rectangle,
  Ellipse,
  Circle,
}
export type element = {
  tool?: tools;
  path: number[][];
  strokeWidth?: number;
  strokeColor?: string;
  roughness?: number;
};
