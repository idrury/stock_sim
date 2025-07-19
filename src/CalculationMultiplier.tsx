import { useState } from "react";
import React from "react";
import { StockGraphParamater } from "./assets/types";
import { DateTime } from "luxon";
import { StatusView } from "./presentation/StatusView";
import { getNextValue, reduceGraph } from "./assets/functions";

function CalculationMultiplier () {
  const [lowRisk, setLowRisk] = useState<StockGraphParamater[]>([
    { value: 3, date: DateTime.now().toFormat("yy:mm:dd") },
  ]);
  const [mediumRisk, setMediumRisk] = useState<StockGraphParamater[]>(
    [{ value: 5, date: DateTime.now().toFormat("yy:mm:dd") }]
  );
  const [highRisk, setHighRisk] = useState<StockGraphParamater[]>([
    { value: 8, date: DateTime.now().toFormat("yy:mm:dd") },
  ]);

  const lowRiskPosMultiplier = 1.1;
  const lowRiskNegMultiplier = 0.95;

  const mediumRiskPosMultiplier = 1.2;
  const mediumRiskNegMultiplier = 0.9;

  const highRiskPosMultiplier = 1.3;
  const highRiskNegMultiplier = 0.85;
  const [seconds, setSeconds] = useState(0);
  const numIntervals = 80;


  // Update values every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLowRisk((prev) => reduceGraph([
        ...prev,
        {
          value: getNextValue(
            prev[prev.length - 1]?.value || 0,
            lowRiskPosMultiplier,
            lowRiskNegMultiplier
          ),
          date: DateTime.now().toFormat("hh:mm:ss"),
        },
      ], numIntervals));
      setMediumRisk((prev) => reduceGraph([
        ...prev,
        {
          value: getNextValue(
            prev[prev.length - 1]?.value || 0,
            mediumRiskPosMultiplier,
            mediumRiskNegMultiplier
          ),
          date: DateTime.now().toFormat("hh:mm:ss"),
        },
      ], numIntervals));
      setHighRisk((prev) => reduceGraph([
        ...prev,
        {
          value: getNextValue(
            prev[prev.length - 1]?.value || 0,
            highRiskPosMultiplier,
            highRiskNegMultiplier
          ),
          date: DateTime.now().toFormat("hh:mm:ss"),
        },
      ], numIntervals));
      setSeconds((prev) => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "24px",
        }}
      >
        <div className="RiskCard low">
          <span style={{ fontSize: "2rem" }}>🟢</span>
          <h1 style={{ marginTop: 10, color: "#2e7d32" }}>SafeCo</h1>
          <p style={{ marginBottom: 20, marginTop: -10 }}>Low Risk</p>
          <h2 style={{ marginBottom: 5, fontSize: "2.5rem" }}>
            {lowRisk[lowRisk.length - 1]?.value.toFixed(2)}
          </h2>
        </div>
        <div className="RiskCard medium">
          <span style={{ fontSize: "2rem" }}>🟡</span>
          <h1 style={{ marginTop: 10, color: "#fbc02d" }}>Apple</h1>
          <p style={{ marginBottom: 20, marginTop: -10 }}>
            Medium Risk
          </p>
          <h2 style={{ marginBottom: 5, fontSize: "2.5rem" }}>
            {mediumRisk[mediumRisk.length - 1]?.value.toFixed(2)}
          </h2>
        </div>
        <div className="RiskCard high">
          <span style={{ fontSize: "2rem" }}>🔴</span>
          <h1 style={{ marginTop: 10, color: "#c62828" }}>
            DogeCoin
          </h1>
          <p style={{ marginBottom: 20, marginTop: -10 }}>
            High Risk
          </p>
          <h2 style={{ marginBottom: 5, fontSize: "2.5rem" }}>
            {highRisk[highRisk.length - 1]?.value.toFixed(2)}
          </h2>
        </div>
      </div>

      <p>{(Math.floor(seconds) * 60) / 600} mins</p>
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
