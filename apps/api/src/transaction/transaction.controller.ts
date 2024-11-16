import { Controller, Get } from '@nestjs/common'
import { TransactionService } from './transaction.service'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  listTransactions() {
    return this.transactionService.listTransactions()
  }
}
