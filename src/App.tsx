import CalculationMultiplier from './CalculationMultiplier'
import './App.css'
import { StatusView } from './presentation/StatusView'

function App () {

  return (
    <>
      <div>
        <StatusView />
      </div>
      <div>
        <CalculationMultiplier />
      </div>
    </>
  )
}

export default App
