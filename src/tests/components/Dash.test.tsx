import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import Dash from '../../components/Dash'
import { TransactionContext } from '../../context/TransactionContext'
import { TransactionProps } from '../../models/TransactionProps'

const mockDeleteTransaction = vi.fn()
const mockNewTransaction = vi.fn()
const mockEditTransaction = vi.fn()
const mockTransactionsSummary = { totalIncome: 1500, totalOutcome: 300 }

const mockTransactions: TransactionProps[] = [
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

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <TransactionContext.Provider value={{
      transactions: mockTransactions,
      deleteTransaction: mockDeleteTransaction,
      transactionsSummary: mockTransactionsSummary,
      newTransaction: mockNewTransaction,
      editTransaction: mockEditTransaction,
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

describe('Dash Component', () => {
  it('should render transactions correctly', () => {
    render(<Dash />, { wrapper: Wrapper })
    expect(screen.getByText('Entradas e saídas')).toBeInTheDocument()
    expect(screen.getByText('Salário')).toBeInTheDocument()
    expect(screen.getByText('Compra Mercado')).toBeInTheDocument()
  })

  it('should call deleteTransaction when delete button is clicked', () => {
    render(<Dash />, { wrapper: Wrapper })

    const deleteButton = screen.getAllByLabelText('delete-button')[0]
    fireEvent.click(deleteButton)

    expect(mockDeleteTransaction).toHaveBeenCalledTimes(1)
  })
})
