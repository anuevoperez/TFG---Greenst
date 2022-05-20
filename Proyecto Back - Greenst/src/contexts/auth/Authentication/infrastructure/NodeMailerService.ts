import nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer";
import EmailService from "../application/EmailService";
import MailOptions from "../domain/MailOptions";

export default class NodeMailerService extends EmailService {
  constructor(host: string, port: string, user: string, pass: string) {
    super(host, port, user, pass);
  }
  async sendEmail(mailOptions: MailOptions): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: this._host,
      port: Number(this._port),
      auth: {
        user: this._user,
        pass: this._pass,
      },
    });
    await transporter.sendMail(mailOptions);
  }
}
