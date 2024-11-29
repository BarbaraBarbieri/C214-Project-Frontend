export interface TransactionProps {
  id: string
  title: string
  description: string
  value: number | undefined
  installments: number
  endsAt: string
  type: string
}