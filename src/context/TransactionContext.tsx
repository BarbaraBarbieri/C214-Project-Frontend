import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { TransactionProps } from '../models/TransactionProps'
import { TransactionSummaryProps } from '../models/TransactionSummaryProps'
import { TransactionContextProps } from '../models/TransactionContextProps'

interface TransacitonProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext<TransactionContextProps>({} as TransactionContextProps)

export function TransactionContextProvider({ children }: TransacitonProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  const [transactionsSummary, setTransactionsSummary] = useState<TransactionSummaryProps>({} as TransactionSummaryProps)

  const getTransactions = useCallback(async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/transactions`)
    const data = await response.json()
    setTransactions(data)
  }, [transactions])

  const getTransactionsSummary = useCallback(async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/transactionsSummary?year=${new Date().getFullYear()}`)
    const data = await response.json()
    setTransactionsSummary(data)
  }, [transactionsSummary])

  const newTransaction = useCallback(async (transaction: TransactionProps) => {
    await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: transaction.title,
        description: transaction.description,
        value: Number(transaction.value),
        installments: Number(transaction.installments),
        endsAt: new Date(transaction.endsAt).toISOString(),
        type: transaction.type
      })
    })

    getTransactions()
    getTransactionsSummary()
  }, [])

  const editTransaction = useCallback(async (transaction: TransactionProps) => {
    await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionId: transaction.id,
        title: transaction.title,
        description: transaction.description,
        value: Number(transaction.value),
        installments: Number(transaction.installments),
        endsAt: new Date(transaction.endsAt).toISOString(),
        type: transaction.type
      })
    })

    getTransactions()
    getTransactionsSummary()
  }, [])

  const deleteTransaction = useCallback(async (transaction: TransactionProps) => {
    await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionId: transaction.id
      })
    })

    getTransactions()
    getTransactionsSummary()
  }, [])

  useEffect(() => {
    getTransactions()
    getTransactionsSummary()
  }, [])

  return (
    <TransactionContext.Provider value={{ transactions, transactionsSummary, newTransaction, editTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}