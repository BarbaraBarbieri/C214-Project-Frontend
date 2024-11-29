import { useContext, useState } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { TransactionProps } from '../models/TransactionProps'
import NewTransactionModal from './TransactionModal'
import { Edit, Trash2 } from 'lucide-react'

export default function Dash() {
  const { transactions, deleteTransaction } = useContext(TransactionContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionProps | null>(null)

  if (!transactions || !transactions.length) {
    return <p className="text-white">Carregando...</p>
  }

  const typeMap = new Map<string, string>([
    ['income', 'Entrada'],
    ['outcome', 'Saída'],
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const handleEdit = (transaction: TransactionProps) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleDelete = (transaction: TransactionProps) => {
    deleteTransaction(transaction)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTransaction(null)
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg text-white w-full mx-auto h-full text-center">
      <h2 className="text-left mb-10 text-2xl">Entradas e saídas</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-white font-bold text-left py-2 border-b border-gray-600">Nome</th>
            <th className="text-white font-bold text-left py-2 border-b border-gray-600">Tipo</th>
            <th className="text-white font-bold text-left py-2 border-b border-gray-600">Data</th>
            <th className="text-white font-bold text-left py-2 border-b border-gray-600">Valor</th>
            <th className="text-white font-bold text-left py-2 border-b border-gray-600">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="py-2 text-left border-b border-gray-600">
                {transaction.title} <br />
              </td>
              <td className="py-2 text-left border-b border-gray-600">
                {typeMap.get(transaction.type) || transaction.type}
              </td>
              <td className="py-2 text-left border-b border-gray-600">
                {new Date(transaction.endsAt).toLocaleDateString('pt-br')}
              </td>
              <td className="py-2 text-left border-b border-gray-600">
                {formatCurrency(transaction.value || 0)}
              </td>
              <td className="py-2 text-left border-b border-gray-600 space-x-2">
                <button onClick={() => handleEdit(transaction)} className="text-gray-500 hover:text-white">
                  <Edit size={20} />
                </button>
                <button onClick={() => handleDelete(transaction)} className="text-gray-500 hover:text-white">
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTransaction && (
        <NewTransactionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />
      )}
    </div>
  )
}
