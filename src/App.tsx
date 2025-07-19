import CalculationMultiplier from "./CalculationMultiplier";
import "./App.css";
import { StatusView } from "./presentation/StatusView";
import { DateTime } from "luxon";

function App() {
  const DUMMY_DATA = new Array<{ value: number; date: string }>();

  function createDummyData(
    interval: number,
    amount: number,
    variation: number
  ) {
    let multi = 1;

    for (var i = 0; i < amount; i++) {
      DUMMY_DATA.push({
        value: Math.random() * variation * multi + multi / 2,
        date: DateTime.now()
          .plus({ seconds: interval * i })
          .toFormat("hh:ss"),
      });
      multi += 1;
    }

    return DUMMY_DATA;
  }

  return (
    <>

      <div>
        <h2>Calculation Multiplier</h2>
        <CalculationMultiplier />
      </div>
    </>
  );
}

export default App;
