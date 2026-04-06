import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    tokenCredentials?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      tokenCredentials?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    routetoken?: string;
  }
}