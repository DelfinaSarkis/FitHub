import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Users } from 'src/User/User.entity';
import { Suscripciones } from './Suscripciones.entity';
import { SubscriptionsRepository } from './suscripciones.repository';
import { SubscriptionsScheduler } from './suscripciones.scheduler';
// import { NotificationService } from 'src/invoice/invoice.service';
// import { InvoiceRepository } from 'src/invoice/invoice.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscripciones, Users, Plan]),
    // InvoiceRepository,
  ],
  providers: [
    SubscriptionsRepository,
    SubscriptionsScheduler,
    // NotificationService,
    //InvoiceRepository,
  ],
  exports: [SubscriptionsRepository],
})
export class SubscriptionsModule {}