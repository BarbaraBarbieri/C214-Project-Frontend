import { TransactionProps } from './TransactionProps'
import { TransactionSummaryProps } from './TransactionSummaryProps'

export interface TransactionContextProps {
  transactions: TransactionProps[]
  deleteTransaction: (transaction: TransactionProps) => void
  transactionsSummary: TransactionSummaryProps
  newTransaction: (transaction: TransactionProps) => void
  editTransaction: (transaction: TransactionProps) => void
}
