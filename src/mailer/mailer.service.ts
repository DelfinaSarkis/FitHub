/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { transporter } from 'config/nodemailer';
import { Response } from 'express';
// import * as path from 'path';
// dotenvConfig({ path: '.env' });

@Injectable()
export class MailerService {
  async notificarRegistro(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'fithub.entrenadorpersonalizado@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email enviado');
      return info;
    } catch (error) {
      console.error('Error al enviar:', error);
      throw error;
    }
  }
}
