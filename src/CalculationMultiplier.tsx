import { useState } from "react";
import React from "react";
import { StockGraphParamater } from "./assets/types";
import { DateTime } from "luxon";
import { StatusView } from "./presentation/StatusView";

function CalculationMultiplier() {
  const [lowRisk, setLowRisk] = useState<StockGraphParamater[]>([
    { value: 3, date: DateTime.now().toFormat("yy:mm:dd") },
  ]);
  const [mediumRisk, setMediumRisk] = useState<StockGraphParamater[]>([
    { value: 5, date: DateTime.now().toFormat("yy:mm:dd") },
  ]);
  const [highRisk, setHighRisk] = useState<StockGraphParamater[]>([
    { value: 8, date: DateTime.now().toFormat("yy:mm:dd") },
  ]);

  const lowRiskPosMultiplier = 1.1;
  const lowRiskNegMultiplier = 0.95;

  const mediumRiskPosMultiplier = 1.2;
  const mediumRiskNegMultiplier = 0.9;

  const highRiskPosMultiplier = 1.3;
  const highRiskNegMultiplier = 0.85;
  const [seconds, setSeconds] = useState(0)

  // Helper to apply multiplier
  const getNextValue = (
    risk: number,
    posMultiplier: number,
    negMultiplier: number
  ): number => {
    if (Math.random() > 0.4) {
      return risk * posMultiplier;
    } else {
      return risk * negMultiplier;
    }
  };

  // Update values every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLowRisk(prev => [
        ...prev,
        {
          value: getNextValue(
            prev[prev.length - 1]?.value || 0,
            lowRiskPosMultiplier,
            lowRiskNegMultiplier
          ),
          date: DateTime.now().toFormat("hh:mm:ss"),
        },
      ]);
     setMediumRisk(prev => [
        ...prev,
        {
          value: getNextValue(
            prev[prev.length - 1]?.value || 0,
            mediumRiskPosMultiplier,
            mediumRiskNegMultiplier
          ),
          date: DateTime.now().toFormat("hh:mm:ss"),
        },
      ]);
         setHighRisk(prev => [
        ...prev,
        {
          value: getNextValue(
            prev[prev.length - 1]?.value || 0,
            highRiskPosMultiplier,
            highRiskNegMultiplier
          ),
          date: DateTime.now().toFormat("hh:mm:ss"),
        },
      ]);
      setSeconds(prev => prev+1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>
        Low Risk: {lowRisk[lowRisk.length - 1]?.value.toFixed(2)}
      </h1>
      <h1>Medium Risk: {mediumRisk[lowRisk.length - 1]?.value.toFixed(2)}</h1>
      <h1>High Risk: {highRisk[lowRisk.length - 1]?.value.toFixed(2)}</h1>
      <p>{(Math.floor(seconds)*60)/600} mins</p>
      <StatusView data={lowRisk} />
      <StatusView data={mediumRisk} />
      <StatusView data={highRisk} />
    </div>

    // Starts at low, med, high,
    // Then every 10 seconds, it gets timesed by a multiplier.
    // There are 2 multiplers for every risk level
    // Low: 1.1, 0.95
    // Medium: 1.2, 0.9
    // High: 1.3, 0.85
    // The multiplier is applied to each risk level every 10 seconds
  );
}

export default CalculationMultiplier;
