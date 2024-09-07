import nodemailer from "nodemailer";
import customError from "./customError";
import { googleCredentials } from "../config";

interface SendMailOptions {
  subject: string;
  message: string;
  send_to: string;
  sent_from?: string;
  reply_to?: string;
}

export const sendMail = async ({
  subject,
  message,
  send_to,
  sent_from,
  reply_to,
}: SendMailOptions): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: googleCredentials.username,
      pass: googleCredentials.password,
    },
  });

  const mailOptions = {
    from: sent_from || "XYZ Support Team",
    to: send_to,
    subject,
    html: message,
    replyTo: reply_to,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    throw new customError(500, (err as Error).message || "Error sending mail");
  }
};

export const sendSignupVerificationCodeMail = (
  email: string,
  code: number
): Promise<boolean> => {
  // const dev = true;
  // if (dev) {
  //   return new Promise<true>((resolve, reject) => {
  //     resolve(true);
  //   });
  // }

  const isMailSent = sendMail({
    subject: "Verify your email",
    send_to: email,
    //   TODO: Shift the expiry time to env file
    message: `Your verification code is ${code}. This will expire after 10 minutes`,
  });

  return isMailSent;
};
