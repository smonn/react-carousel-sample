import type * as CSS from "csstype";

declare module "csstype" {
  interface Properties {
    // Allow any CSS Custom Properties
    [index: `--${string}`]: string | number;
  }
}

declare module "react" {
  interface CSSProperties {
    [index: `--${string}`]: string | number;
  }
}

export {};
