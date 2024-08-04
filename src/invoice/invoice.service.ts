import { Injectable } from "@nestjs/common";
import { InvoiceRepository } from "./invoice.repository";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Invoice } from "./invoice.entity";

@Injectable()
export class NotificationService {
    constructor(private readonly invoiceRepository: InvoiceRepository){}

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async sendInvoideReminders(){
        const invoices = await this.invoiceRepository.findInvoicesInThreeDays();

        for (const invoice of invoices){
            this.sendReminder(invoice)
        }
    }

    private async sendReminder(invoice: Invoice){
        const user = invoice.user;
        const plan = invoice.plan;

        console.log(`Enviando reacordatorio a ${user.email}: Su suscripción al plan ${plan.name} vence en 3 días.`);
    }
}