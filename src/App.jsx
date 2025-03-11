import './App.css';
import { MdOutlineBluetoothAudio } from "react-icons/md";

function App() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[400px] h-full bg-green-200">
      </div>
      <div className='w-full bg-red-900'>
      <MdOutlineBluetoothAudio className='text-[300px] text-white'/>

      </div>
    </div>

  )
}

export default App
