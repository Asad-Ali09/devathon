import { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
  path: "/",
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 86400 * 3), // 3 Days
  sameSite: "none",
  secure: true,
};

export const generate6DigitCode = () => {
  const min = 100000;
  const max = 999999;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;
  return code;
};
