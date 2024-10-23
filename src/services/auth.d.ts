declare module '../services/auth' {
    export function login(email: string, password: string): Promise<{ access_token: string }>;
  }