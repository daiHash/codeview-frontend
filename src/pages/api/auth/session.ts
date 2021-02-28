// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Response, Request } from "express";

export default (req: Request, res: Response) => {
  res.statusCode = 200;
  res.json({ session: req.headers, cookies: req.cookies });
};
