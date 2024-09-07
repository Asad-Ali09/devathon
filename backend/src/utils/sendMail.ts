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

export const sendAppointmentEmailForPateint = (
  email: string,
  doctorName: string,
  day: string,
  startTime: Date,
  endTime: Date,
  date: Date
): Promise<boolean> => {
  // Format dates for readability
  const formattedStartTime = startTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedEndTime = endTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Construct the email message
  const message = `Dear Patient,

Your appointment has been successfully booked with Dr. ${doctorName}.

Details:
- Date: ${formattedDate}
- Day: ${day}
- Time: ${formattedStartTime} to ${formattedEndTime}

Thank you for using our services.

Best regards,
Your Clinic`;

  // Send the email
  const isMailSent = sendMail({
    subject: "Appointment Booked",
    send_to: email,
    message: message,
  });

  return isMailSent;
};

export const sendAppointmentEmailForDoctor = (
  email: string,
  patientName: string,
  day: string,
  startTime: Date,
  endTime: Date,
  date: Date
): Promise<boolean> => {
  // Format dates for readability
  const formattedStartTime = startTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedEndTime = endTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Construct the email message
  const message = `Dear Doctor,

An appointment has been booked with you.

Details:
- Patient: ${patientName}
- Date: ${formattedDate}
- Day: ${day}
- Time: ${formattedStartTime} to ${formattedEndTime}

Please make sure to be available at the specified time.

Thank you for your attention.

Best regards,
Your Clinic`;

  // Send the email
  const isMailSent = sendMail({
    subject: "New Appointment Booked",
    send_to: email,
    message: message,
  });

  return isMailSent;
};
