import { useState } from "react";
import React from "react";
import { StockGraphParamater } from "./assets/types";
import { DateTime } from "luxon";
import { StatusView } from "./presentation/StatusView";
import { reduceGraph } from "./assets/functions";

function CalculationMultiplier () {
  // Add bias state for each risk level
  const [lowRisk, setLowRisk] = useState<StockGraphParamater[]>([
    { value: 7, date: DateTime.now().toFormat("yy:mm:dd") },
  ]);
  const [lowBias, setLowBias] = useState(0.01);

  const [mediumRisk, setMediumRisk] = useState<StockGraphParamater[]>([
    { value: 12, date: DateTime.now().toFormat("yy:mm:dd") }
  ]);
  const [mediumBias, setMediumBias] = useState(0.01);

  const [highRisk, setHighRisk] = useState<StockGraphParamater[]>([
    { value: 16, date: DateTime.now().toFormat("yy:mm:dd") }
  ]);
  const [highBias, setHighBias] = useState(0.01);


  const [lowCenter, setLowCenter] = useState(10);
  const [mediumCenter, setMediumCenter] = useState(15);
  const [highCenter, setHighCenter] = useState(20);


  const lowRiskPosMultiplier = 1.08;
  const lowRiskNegMultiplier = 0.95;

  const mediumRiskPosMultiplier = 1.15;
  const mediumRiskNegMultiplier = 0.9;

  const highRiskPosMultiplier = 1.3;
  const highRiskNegMultiplier = 0.8;
  const [seconds, setSeconds] = useState(0);
  const numIntervals = 80;

  // Helper to apply multiplier, now takes bias as argument
  function getNextValueDynamic (
    value: number,
    posMultiplier: number,
    negMultiplier: number,
    bias: number,
    center: number,
    k: number
  ): number {
    // Sigmoid: as value increases above center, chance to go down increases
    // As value decreases below center, chance to go up increases
    // bias keeps a small upward tendency
    const upChance = 1 / (1 + Math.exp(k * (value - center))) + bias;
    const clampedUpChance = Math.min(1, Math.max(0, upChance));

    if (Math.random() < clampedUpChance) {
      return value * posMultiplier;
    } else {
      return value * negMultiplier;
    }
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Slightly increase bias each interval (e.g., 0.0001)
      setLowBias(prev => Math.min(prev + 0.01, 0.215));
      setMediumBias(prev => Math.min(prev + 0.01, 0.215));
      setHighBias(prev => Math.min(prev + 0.01, 0.215));

      setLowRisk((prev) => reduceGraph([
        ...prev,
        {
          value: getNextValueDynamic(
            prev[prev.length - 1]?.value || 0,
            lowRiskPosMultiplier,
            lowRiskNegMultiplier,
            lowBias,
            lowCenter,    // use state for center
            0.15
          ),
          date: DateTime.now().toFormat("hh:mm:ss"),
        },
      ], numIntervals));
      setMediumRisk((prev) => reduceGraph([
        ...prev,
        {
          value: getNextValueDynamic(
            prev[prev.length - 1]?.value || 0,
            mediumRiskPosMultiplier,
            mediumRiskNegMultiplier,
            mediumBias,
            mediumCenter,
            0.15
          ),
          date: DateTime.now().toFormat("hh:mm:ss"),
        },
      ], numIntervals));
      setHighRisk((prev) => reduceGraph([
        ...prev,
        {
          value: getNextValueDynamic(
            prev[prev.length - 1]?.value || 0,
            highRiskPosMultiplier,
            highRiskNegMultiplier,
            highBias,
            highCenter,
            0.15
          ),
          date: DateTime.now().toFormat("hh:mm:ss"),
        },
      ], numIntervals));
      setSeconds((prev) => {
        const next = prev + 1;
        // Every 600 ticks (1 minute), increase center by 1%
        if (next % 600 === 0) {
          setLowCenter(c => c * 1.01);
          setMediumCenter(c => c * 1.01);
          setHighCenter(c => c * 1.01);
        }
        return next;
      });
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [lowBias, mediumBias, highBias, lowCenter, mediumCenter, highCenter]);


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


      </div>

      <p>{(Math.floor(seconds) * 60) / 600} mins</p>
      <div className="row outline w100 p2 mb2 middle">
        <div className="RiskCard low pr3">
          <span style={{ fontSize: "2rem" }}>🟢</span>
          <h1 style={{ marginTop: 10, color: "#2e7d32" }}>SafeCo</h1>
          <p style={{ marginBottom: 20, marginTop: -10 }}>Low Risk</p>
          <h2 style={{ marginBottom: 5, fontSize: "2.5rem" }}>
            {lowRisk[lowRisk.length - 1]?.value.toFixed(2)}
          </h2>
        </div>
        <div className="w100" style={{ height: "100%" }}>
          <StatusView data={lowRisk} />
        </div>
      </div>

      <div className="row outline w100 p2 mb2 middle">
        <div className="RiskCard medium pr3">
          <span style={{ fontSize: "2rem" }}>🟡</span>
          <h1 style={{ marginTop: 10, color: "#fbc02d" }}>Apple</h1>
          <p style={{ marginBottom: 20, marginTop: -10 }}>
            Medium Risk
          </p>
          <h2 style={{ marginBottom: 5, fontSize: "2.5rem" }}>
            {mediumRisk[mediumRisk.length - 1]?.value.toFixed(2)}
          </h2>
        </div>
        <div className="w100" style={{ height: "100%" }}>
          <StatusView data={mediumRisk} />
        </div>
      </div>

      <div className="row outline w100 p2 mb2 middle">
        <div className="RiskCard high pr3">
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
        <div className="w100" style={{ height: "100%" }}>
          <StatusView data={highRisk} />
        </div>
      </div>
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
