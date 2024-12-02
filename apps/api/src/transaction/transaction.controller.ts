import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { Transaction } from './transaction'

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':userId')
  listTransactions(@Param('userId') userId: string) {
    return this.transactionService.listTransactions(userId)
  }

  @Post()
  createTransaction(@Body() transaction: Transaction) {
    this.transactionService.createTransaction(transaction)
  }

  @Put(':id')
  updateTransaction(@Body() transaction: Transaction, @Param('id') id: string) {
    this.transactionService.updateTransaction(transaction, id)
  }

  @Get('/summary/:userId')
  getSummary(@Param('userId') userId: string, @Query('month') month: string) {
    return this.transactionService.getSummary(userId, month)
  }
}
