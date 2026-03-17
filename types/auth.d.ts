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

// Extend Auth.js types so our session always includes `user.id` (and tokens).
// This makes `session.user.id` usable in client code without TS errors.

declare module "@auth/core" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id: string;
      accessToken?: string;
      idToken?: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
  }
}
