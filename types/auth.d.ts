// Nuxt adds a virtual `#auth` import that exposes the runtime handler.
// The official package doesn’t export the function directly from its root
// typings, so we declare a lightweight stub here.  We don’t need full types
// – anything that accepts a handler function will work fine.

declare module "#auth" {
  // the real signature lives deep inside the package, but we don’t need it
  // here.  using `any` keeps TS happy without forcing a dependency on the
  // package’s internal file paths.
  const NuxtAuthHandler: any;
  export { NuxtAuthHandler };
}
