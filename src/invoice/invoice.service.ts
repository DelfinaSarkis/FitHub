import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from './invoice.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Invoice } from './invoice.entity';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly emailService: MailerService,
  ) {}

  // @Cron(CronExpression.EVERY_DAY_AT_2PM)
  @Cron(CronExpression.EVERY_10_MINUTES)
  async sendInvoideReminders() {
    console.log('Cron ejeutado');
    const invoices = await this.invoiceRepository.findInvoicesInThreeDays();
    console.log(invoices, '.......invoices');
    if (invoices.length !== 0) {
      for (const invoice of invoices) {
        console.log(invoice, '...................dentro del for');
        this.sendReminder(invoice);
      }
    }
    return 'Sin invoice por recordar';
  }

  private async sendReminder(invoice: Invoice) {
    const user = invoice.user;
    const plan = invoice.plan;
    console.log(user, '..................', plan);

    const subject = 'Recordatorio de suscripción';
    const text = `Hola ${user.name}, su suscripción al plan ${plan.name} vence en 3 días.`;

    console.log(
      `Enviando reacordatorio a ${user.email}: Su suscripción al plan ${plan.name} vence en 3 días.`,
    );
    await this.emailService.notificarRegistro(user.email, subject, text);
  }
}
