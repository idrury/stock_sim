import CalculationMultiplier from "./CalculationMultiplier";
import "./App.css";

import { useState } from "react";
import { Controls } from "./presentation/Controls";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      <div className="col middle center w100">
        <Controls
          onStart={() => setStarted(true)}
          onCrash={() => {
            console.log("CRASH");
          }}
        />
        {started ? (
          <div className="w100">
            <CalculationMultiplier />
          </div>
        ) : (
          <h2>Press start to begin</h2>
        )}
      </div>
    </>
  );
}

export default App;
