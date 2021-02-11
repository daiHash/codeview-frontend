import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { Response } from "express";
import { NextApiRequest } from "next";

const options = {
  providers: [
    Providers.Google({
      clientId:
        "620048498136-254cqv7quo98e18m9sh9bnpmtbvcj702.apps.googleusercontent.com",
      clientSecret: "ORuUcYL5qgjY9w5tq4ZUfxnh",
    }),
  ],
};

const Auth = (req: NextApiRequest, res: Response) =>
  NextAuth(req, res, options);

export default Auth;
