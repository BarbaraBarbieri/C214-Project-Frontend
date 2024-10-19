import Dash from './components/Dash'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <div className='flex bg-gray-800'>
      <Sidebar />
      
      <div className='w-full p-12'>
        <Dash />
      </div>
    </div>
  )
}