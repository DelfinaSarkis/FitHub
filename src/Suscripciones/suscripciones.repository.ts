import { Injectable } from '@nestjs/common';
import { Suscripciones } from './Suscripciones.entity';
import { LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/User/User.entity';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { InvoiceRepository } from 'src/invoice/invoice.repository';
import { Invoice } from 'src/invoice/invoice.entity';

@Injectable()
export class SubscriptionsRepository {
  constructor(
    @InjectRepository(Suscripciones)
    private readonly subscriptionRepository: Repository<Suscripciones>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  async createSubscription(
    userId: string,
    planId: string,
  ): Promise<Suscripciones> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const user = await this.userRepository.findOne({
      where: { id: userId, isActive: true },
    });
    const plan = await this.planRepository.findOne({
      where: { id: planId, isActive: true },
    });

    if (!user || !plan) {
      throw new Error('Usuario o plan no encontrado');
    }

    const subscription = this.subscriptionRepository.create({
      user,
      plan,
      startDate,
      endDate,
      state: true,
    });

    await this.subscriptionRepository.save(subscription);

    const invoiceData = {
      user,
      plan,
      amount: plan.price,
      currency: 'ARS',
      paymentDate: startDate,
      dueDate: endDate,
    };

    const invoice = await this.invoiceRepository.createInvoice(invoiceData)
    await this.sendInvoiceByEmail(invoice);

    return subscription;
  }

  private async sendInvoiceByEmail(invoice: Invoice){
    const user = invoice.user;
    const subject = 'Factura de Pago';
    const text = `Hola ${user.name}, aquí tienes tu factura del plan ${invoice.plan.name}.
    Monto: ${invoice.amount} ${invoice.currency}
    Fecha de Pago: ${invoice.paymentDate}
    Fecha de Vencimiento: ${invoice.dueDate}`;
  }

  async findExpiredSubscriptions() {
    return this.subscriptionRepository.find({
      where: { endDate: LessThan(new Date()), state: true },
    });
  }

  async saveSubscriptions(subscription: Suscripciones) {
    return this.subscriptionRepository.save(subscription);
  }
}
