import CalculationMultiplier from "./CalculationMultiplier";
import "./App.css";

import { useState } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [crashFlag, setCrashFlag] = useState(false);

  const handleCrash = () => {
    setCrashFlag((flag) => !flag); // Toggle to trigger crash
    console.log("CRASH");
  };

  return (
    <>
      <div className="col middle center w100">
        <h1 className="mb2 mt2">The Stocks</h1>
        {started ? (
          <div className="w100">
            <CalculationMultiplier crashFlag={crashFlag} />
          </div>
        ) : (
          <h3 className="m2 pb3 pt3">Press start to begin</h3>
        )}
        <div className="w50 pb3 row">
          <button
            className="w100 mr1"
            onClick={() => setStarted(!started)}
          >
           {started ? "Stop" : "Start"}
          </button>
          {started && (
            <button className="w100 ml1" onClick={handleCrash}>
              Crash
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
