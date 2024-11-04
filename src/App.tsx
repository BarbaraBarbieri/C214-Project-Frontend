import Dash from './components/Dash'
import Sidebar from './components/Sidebar'
import Statistics from './components/Statistics'

export default function App() {
  return (
    <div className='flex bg-gray-800'>
      <Sidebar />

      <div className='w-full p-12'>
        {/* Adicionando o componente Statistics */}
        <Statistics totalIncome="$1,329.00" totalExpense="$1,329.00" />
        
        <Dash />
      </div>
    </div>
  )
}
