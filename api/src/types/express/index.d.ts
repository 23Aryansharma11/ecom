export {};

declare global {
  namespace Express {
    export interface Request {
      cleanBody?: any;
      userId?: Number;
      role?: "admin" | "user" | "seller";

    }
  }
}
