import React, { useContext, useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { ModalProps } from '../models/ModalProps'
import { TransactionProps } from '../models/TransactionProps'
import { TransactionContext } from '../context/TransactionContext'
import CurrencyInput from 'react-currency-input-field'

interface NewTransactionModalProps extends ModalProps {
  transaction?: TransactionProps
}

export default function TransactionModal({ isOpen, onClose, transaction }: NewTransactionModalProps) {
  const { newTransaction, editTransaction } = useContext(TransactionContext)

  const [formData, setFormData] = useState<TransactionProps>({
    id: '',
    title: '',
    type: 'income',
    description: '',
    installments: 0,
    value: undefined,
    endsAt: new Date().toISOString(),
  })

  useEffect(() => {
    if (transaction) {
      setFormData({
        id: transaction.id,
        title: transaction.title,
        type: transaction.type,
        description: transaction.description,
        installments: transaction.installments,
        value: transaction.value,
        endsAt: transaction.endsAt,
      })
    } else {
      setFormData({
        id: '',
        title: '',
        type: 'income',
        description: '',
        installments: 0,
        value: 0,
        endsAt: new Date().toISOString(),
      })
    }
  }, [transaction])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCurrencyChange = (value: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      value: value ? parseFloat(value.replace(',', '.')) : 0,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formattedData = {
      ...formData,
      endsAt: new Date(formData.endsAt).toISOString(),
    }

    if (formData.id) {
      editTransaction(formattedData)
    } else {
      newTransaction(formattedData)
    }
    onClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      closeIcon={null}
      styles={{
        modal: {
          background: 'transparent'
        },
      }}
    >
      <div className="p-6 bg-gray-900 text-white rounded-lg">
        <div className="mb-4">
          <h2 className="text-xl font-bold">{formData.id ? 'Editar Transação' : 'Nova Transação'}</h2>
          <p className="text-sm text-gray-400">
            Preencha os dados abaixo para adicionar ou editar uma transação.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Título da Transação
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
              placeholder="Adicione um título"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
              placeholder="Adicione uma descrição"
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block font-medium mb-1">
                Tipo
              </label>
              <div className="flex space-x-4 h-[52px]">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
                  className={`w-1/2 p-2 rounded ${formData.type === 'income' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
                    }`}
                >
                  Entrada
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'outcome' }))}
                  className={`w-1/2 p-2 rounded ${formData.type === 'outcome' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400'
                    }`}
                >
                  Saída
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="endsAt" className="block font-medium mb-1">
                Data
              </label>
              <input
                type="date"
                id="endsAt"
                name="endsAt"
                value={formData.endsAt.slice(0, 10)}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="value" className="block font-medium mb-1">
                Valor (R$)
              </label>
              <CurrencyInput
                id="value"
                name="value"
                prefix="R$ "
                decimalSeparator=","
                groupSeparator="."
                decimalsLimit={2}
                value={formData.value?.toFixed(2)}
                onValueChange={handleCurrencyChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
                placeholder="R$ 0,00"
                required
              />
            </div>
            <div>
              <label htmlFor="installments" className="block font-medium mb-1">
                Parcelas
              </label>
              <input
                type="number"
                id="installments"
                name="installments"
                value={formData.installments}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
                placeholder="Número de parcelas"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-gray-700 text-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="p-2 bg-yellow-400 text-black rounded"
            >
              {formData.id ? 'Editar Transação' : 'Salvar Transação'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}