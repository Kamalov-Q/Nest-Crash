import { HttpException, HttpStatus, Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Users Middleware");
    // let token = req?.headers?.authorization;
    // token = token?.split(" ")[1];
    const { authorization } = req?.headers;

    if (!authorization) {
      throw new HttpException("No token provided", HttpStatus?.FORBIDDEN);
    }

    const token = String(authorization?.split(" ")[1]);
    const secret = String(process?.env?.JWT_SECRET);

    console.log(token, secret, "Token and secret");
    

    if (token != secret) {
      throw new HttpException("Token is not valid", HttpStatus?.FORBIDDEN)
    }

    next();
  }
}
