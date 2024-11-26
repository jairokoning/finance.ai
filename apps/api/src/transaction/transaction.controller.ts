import { Body, Controller, Get, Post } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { Transaction } from './transaction'

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  listTransactions() {
    return this.transactionService.listTransactions()
  }

  @Post()
  createTransaction(@Body() transaction: Transaction) {
    this.transactionService.createTransaction(transaction)
  }
}
