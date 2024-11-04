import React, { useEffect, useState } from 'react'

interface StatisticsProps {
  totalIncome: string
  totalExpense: string
  incomePercentage: string
  expensePercentage: string
}

const Statistics: React.FC = () => {
  // Estado para armazenar os valores de renda, despesa e porcentagens
  const [data, setData] = useState<StatisticsProps>({
    totalIncome: '0',
    totalExpense: '0',
    incomePercentage: '0%',
    expensePercentage: '0%',
  })

  // Simulando uma chamada ao backend para buscar os dados
  useEffect(() => {
    const fetchMockData = async () => {
      // Simulando um atraso de resposta do backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock dos dados recebidos do backend
      const mockData = {
        totalIncome: 'R$ 50.000,00',
        totalExpense: 'R$ 20.000,00',
        incomePercentage: '10% a mais que o ano passado',
        expensePercentage: '5% a mais que o ano passado',
      }

      // Atualizando o estado com os dados mockados
      setData(mockData)
    }

    fetchMockData()
  }, [])

  return (
    <div className="flex gap-4 mb-8">
    {/* Quadro "Nova Transação" */}
    <div className="bg-gray-900 text-white rounded-lg p-6 flex-1 text-left">
        <p className="font-semibold text-lg mb-2">Registrar uma nova transação?</p>
        <button className="border border-orange-400 text-orange-400 py-2 px-4 rounded bg-transparent hover:bg-orange-400 hover:text-white transition duration-200">
          Nova transação
        </button>
      </div>


      {/* Quadro "Entradas" */}
      <div className="bg-gray-900 text-white rounded-lg p-6 flex-1 text-left">
        <p className="text-lg text-gray-400">Entradas deste ano</p>
        <p className="text-2xl font-bold">{data.totalIncome}</p>
        <p className="text-sm text-gray-400">{data.incomePercentage}</p>
      </div>

      {/* Quadro "Saídas" */}
      <div className="bg-gray-900 text-white rounded-lg p-6 flex-1 text-left">
        <p className="text-lg text-gray-400">Saídas deste ano</p>
        <p className="text-2xl font-bold">{data.totalExpense}</p>
        <p className="text-sm text-gray-400">{data.expensePercentage}</p>
      </div>
    </div>
  )
}

export default Statistics
