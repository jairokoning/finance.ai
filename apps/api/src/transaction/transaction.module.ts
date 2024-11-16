import { Module } from '@nestjs/common'
import { TransactionController } from './transaction.controller'
import { TransactionService } from './transaction.service'
import { TransactionPrismaRepository } from './transaction.prisma-repository'
import { PrismaService } from 'src/prisma/prisma.service'
import TransactionRepository from './transaction.respository'

@Module({
  controllers: [TransactionController],
  providers: [
    {
      provide: TransactionService,
      useFactory: (transactionRepository: TransactionRepository) =>
        new TransactionService(transactionRepository),
      inject: [TransactionPrismaRepository],
    },
    {
      provide: TransactionPrismaRepository,
      useFactory: (prismaService: PrismaService) =>
        new TransactionPrismaRepository(prismaService),
      inject: [PrismaService],
    },
    PrismaService,
  ],
})
export class TransactionModule {}
