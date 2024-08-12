import { Injectable } from "@nestjs/common";
import { InvoiceRepository } from "./invoice.repository";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Invoice } from "./invoice.entity";
import { MailerService } from "src/mailer/mailer.service";

@Injectable()
export class NotificationService {
    constructor(private readonly invoiceRepository: InvoiceRepository,
        private readonly emailService: MailerService
    ){}

    @Cron(CronExpression.EVERY_DAY_AT_1PM)
    async sendInvoideReminders(){
        const invoices = await this.invoiceRepository.findInvoicesInThreeDays();

        for (const invoice of invoices){
            this.sendReminder(invoice)
        }
    }

    private async sendReminder(invoice: Invoice){
        const user = invoice.user;
        const plan = invoice.plan;

        const subject = 'Recordatorio de suscripción';
        const text = `Hola ${user.name}, su suscripción al plan ${plan.name} vence en 3 días.`;

        console.log(`Enviando reacordatorio a ${user.email}: Su suscripción al plan ${plan.name} vence en 3 días.`);
        await this.emailService.notificarRegistro(user.email, subject, text);

    }
}