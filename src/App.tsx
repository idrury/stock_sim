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
        <h2>Calculation Multiplier</h2>
        <CalculationMultiplier />
      </div>
    </>
  )
}

export default App
