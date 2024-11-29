import { TransactionContextProvider } from './context/TransactionContext'
import Dash from './components/Dash'
import Statistics from './components/Statistics'

export default function App() {
  return (
    <TransactionContextProvider>
      <div className='flex flex-col gap-8 p-12 w-full h-screen bg-gray-800'>
        <Statistics />
        <Dash />
      </div>
    </TransactionContextProvider>
  )
}