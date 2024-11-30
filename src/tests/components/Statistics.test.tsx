import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import Statistics from '../../components/Statistics'
import { TransactionContext } from '../../context/TransactionContext'
import { TransactionProps } from '../../models/TransactionProps'

// Mock do estado do contexto
const mockTransactionsSummary = {
  totalIncome: 1500,
  totalOutcome: 300,
}

const mockTransactions: TransactionProps[] = [ // Tipando como um array de TransactionProps
  {
    id: '1',
    title: 'Salário',
    description: 'Bolsa de estágio do Inatel de Novembro',
    type: 'income',
    value: 1500,
    installments: 1,
    endsAt: '2024-11-01',
  },
  {
    id: '2',
    title: 'Compra Mercado',
    description: 'Compra do mês de Novembro no Alvorada',
    type: 'outcome',
    value: 300,
    installments: 1,
    endsAt: '2024-11-02',
  },
]

const mockDeleteTransaction = vi.fn()
const mockNewTransaction = vi.fn()
const mockEditTransaction = vi.fn()

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <TransactionContext.Provider
      value={{
        transactionsSummary: mockTransactionsSummary,
        transactions: mockTransactions,
        deleteTransaction: mockDeleteTransaction,
        newTransaction: mockNewTransaction,
        editTransaction: mockEditTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

describe('Statistics Component', () => {
  it('should render the correct statistics', () => {
    render(<Statistics />, { wrapper: Wrapper })

    expect(screen.getByText('Entradas deste ano')).toBeInTheDocument()
    expect(screen.getByText('Saídas deste ano')).toBeInTheDocument()
    expect(screen.getByText('R$ 1.500,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 300,00')).toBeInTheDocument()
  })

  it('should open the modal when "Nova transação" button is clicked', () => {
    render(<Statistics />, { wrapper: Wrapper })

    const newTransactionButton = screen.getByText('Nova transação')
    fireEvent.click(newTransactionButton)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
