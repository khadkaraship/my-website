/// <reference path="../.astro/types.d.ts" />

declare module '*.yaml' {
  const data: unknown;
  export default data;
}
