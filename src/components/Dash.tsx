import React, { useState, useEffect } from 'react'

// Definindo a interface para os dados de transações
interface Transaction {
  name: string;
  email: string;
  type: string;
  date: string;
  amount: string;
}

// Dados mockados para teste
const mockTransactions: Transaction[] = [
  {
    name: 'Alice Coelho',
    email: 'alice@example.com',
    type: 'Entrada',
    date: '2024-10-17',
    amount: 'R$ 100,00',
  },
  {
    name: 'Barbara Babi',
    email: 'babi@example.com',
    type: 'Saída',
    date: '2024-10-18',
    amount: 'R$ 50,00',
  },
  {
    name: 'Yves Anthony',
    email: 'yves@example.com',
    type: 'Entrada',
    date: '2024-10-18',
    amount: 'R$ 200,00',
  },
]

const Dash: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulando a chamada à API com dados mockados
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Simulando um atraso na resposta da API para testes
        await new Promise((resolve) => setTimeout(resolve, 1000)) // 1 segundo de atraso

        // Em vez de buscar na API, usar os dados mockados
        setTransactions(mockTransactions)
        setLoading(false)
      } catch {
        setError('Erro ao carregar transações.')
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (loading) {
    return <p className="text-white">Carregando...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg text-white w-full mx-auto h-[646px] text-center">
      <h2 className="text-left mb-10 text-2xl">Entradas e saídas</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-white font-bold text-left py-2 border-b border-gray-600">Nome</th>
            <th className="text-white font-bold text-left py-2 border-b border-gray-600">Tipo</th>
            <th className="text-white font-bold text-left py-2 border-b border-gray-600">Data</th>
            <th className="text-white font-bold text-left py-2 border-b border-gray-600">Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="py-2 text-left border-b border-gray-600">
                {transaction.name} <br />
                <span className="text-gray-400 text-xs">{transaction.email}</span>
              </td>
              <td className="py-2 text-left border-b border-gray-600">{transaction.type}</td>
              <td className="py-2 text-left border-b border-gray-600">{transaction.date}</td>
              <td className="py-2 text-left border-b border-gray-600">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dash
