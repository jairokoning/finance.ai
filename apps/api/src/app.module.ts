import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaModule } from './prisma/prisma.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [TransactionModule, PrismaModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
