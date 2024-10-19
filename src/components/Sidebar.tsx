import { useContext, useState } from 'react'
import Anchor from './Anchor'
import { UserContext } from '../context/user-context'

export default function Sidebar() {
  const [isSelected, setIsSelected] = useState('')
  const { users } = useContext(UserContext)

  function handleSelected(id: string): void {
    console.log(id)
    setIsSelected(id)
  }

  return (
    <div className='flex flex-col gap-8 h-screen w-60 px-4 py-8 bg-gray-900'>
      <p className='text-white font-medium'>{users.length && users[0].name}</p>

      <div className='flex flex-col gap-4'>
        <span className='text-sm text-gray-500 font-semibold'>Páginas</span>

        <div className='flex flex-col gap-2'>
          <Anchor icon="House" content="Início" isSelected={isSelected} onClick={handleSelected} />
          <Anchor icon="CircleDollarSign" content="Fluxo de caixa" isSelected={isSelected} onClick={handleSelected} />
          <Anchor icon="ChartLine" content="Projeções" isSelected={isSelected} onClick={handleSelected} />
        </div>
      </div>
    </div>
  )
}