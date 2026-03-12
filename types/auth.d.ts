// declare module alias exported by @sidebase/nuxt-auth so TS can resolve it
// the package already provides proper typings; we just need the alias

declare module "#auth" {
  // re-export the handler directly; import without `type` so the value
  // is visible to the compiler.
  export { NuxtAuthHandler } from "@sidebase/nuxt-auth";
}
