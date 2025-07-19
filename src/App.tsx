import CalculationMultiplier from "./CalculationMultiplier";
import "./App.css";

import { useState } from "react";
import { Controls } from "./presentation/Controls";

function App () {
  const [started, setStarted] = useState(false);
  const [crashFlag, setCrashFlag] = useState(false);

  const handleCrash = () => {
    setCrashFlag(flag => !flag); // Toggle to trigger crash
    console.log("CRASH");
  };

  return (
    <>
      <div className="col middle center w100">
        <Controls
          onStart={() => setStarted(true)}
          onCrash={handleCrash}
        />
        {started ? (
          <div className="w100">
            <CalculationMultiplier crashFlag={crashFlag} />
          </div>
        ) : (
          <h2>Press start to begin</h2>
        )}
      </div>
    </>
  );
}

export default App;
