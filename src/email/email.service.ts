import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class EmailService {
  async sendEmail (to: string, subject: string, text: string) {
    // sender 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL, // generated ethereal user
        pass: process.env.GMAIL_PASSWORD, // generated ethereal password
      },
    })

    // recevier 
    const emailInfo = await transporter.sendMail({
      from: `"E-commerce" ${process.env.GMAIL}`,
      to,
      subject,
      text
    })

    return emailInfo.accepted.length < 1 ? false : true
  }
}
