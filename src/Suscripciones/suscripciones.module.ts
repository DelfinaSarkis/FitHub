import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Users } from 'src/User/User.entity';
import { Suscripciones } from './Suscripciones.entity';
import { SubscriptionsRepository } from './suscripciones.repository';
import { SubscriptionsScheduler } from './suscripciones.scheduler';

@Module({
    imports: [TypeOrmModule.forFeature([Suscripciones, Users, Plan])],
    providers: [SubscriptionsRepository, SubscriptionsScheduler],
    exports: [SubscriptionsRepository]
})
export class SubscriptionsModule {}