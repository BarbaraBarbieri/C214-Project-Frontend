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
    return <p style={{ color: '#FFF' }}>Carregando...</p>
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Entradas e saídas</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>Nome</th>
            <th style={styles.header}>Tipo</th>
            <th style={styles.header}>Data</th>
            <th style={styles.header}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td style={styles.cell}>
                {transaction.name} <br />
                <span style={styles.email}>{transaction.email}</span>
              </td>
              <td style={styles.cell}>{transaction.type}</td>
              <td style={styles.cell}>{transaction.date}</td>
              <td style={styles.cell}>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Definição dos estilos inline, usando 'as const'
const styles = {
  container: {
    backgroundColor: '#09090B',
    padding: '24px',
    borderRadius: '8px',
    color: '#FFF',
    width: '100%',
    maxWidth: '658px',
    height: '646px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    textAlign: 'left',
    marginBottom: '38px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  header: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '10px 0',
    borderBottom: '1px solid #333',
  },
  cell: {
    padding: '10px 0',
    textAlign: 'left',
    borderBottom: '1px solid #333',
  },
  email: {
    color: '#AAA',
    fontSize: '12px',
  },
} as const // Declaração 'as const'

export default Dash