import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../config";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      //Todo: caso de uso GetUserById
      // const user=
      // if ( !user ) return res.status(401).json({ error: 'Invalid token - user' });

      // todo: devolver usuario al body, para usarlo en las insert, delete, update

      // req.body.user = user

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
