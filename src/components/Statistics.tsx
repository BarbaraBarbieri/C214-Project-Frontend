import { useContext, useState } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import TransactionModal from './TransactionModal'
import 'react-responsive-modal/styles.css'

export default function Statistics() {
  const { transactionsSummary } = useContext(TransactionContext)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const formatCurrency = (value: number | string) => {
    const numberValue = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue || 0)
  }

  return (
    <div className="flex gap-8">
      <div className="bg-gray-900 text-white rounded-lg p-6 flex-1 text-left">
        <p className="font-semibold text-lg mb-2">Registrar uma nova transação?</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-orange-400 text-orange-400 py-2 px-4 rounded bg-transparent hover:bg-orange-400 hover:text-white transition duration-200"
        >
          Nova transação
        </button>
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      <div className="bg-gray-900 text-white rounded-lg p-6 flex-1 text-left">
        <p className="text-lg text-gray-400">Entradas deste ano</p>
        <p className="text-2xl font-bold">
          {formatCurrency(transactionsSummary.totalIncome || 0)}
        </p>
      </div>

      <div className="bg-gray-900 text-white rounded-lg p-6 flex-1 text-left">
        <p className="text-lg text-gray-400">Saídas deste ano</p>
        <p className="text-2xl font-bold">
          {formatCurrency(transactionsSummary.totalOutcome || 0)}
        </p>
      </div>
    </div>
  )
}
