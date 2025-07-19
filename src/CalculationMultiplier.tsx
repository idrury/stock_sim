import { useState } from "react";
import React from "react";
import { StockGraphParamater } from "./assets/types";
import { DateTime } from "luxon";
import { StatusView } from "./presentation/StatusView";
import { reduceGraph } from "./assets/functions";

function CalculationMultiplier({
  crashFlag,
}: {
  crashFlag?: boolean;
}) {
  const numIntervals = 80;
  const dateFormat = "hh:mm a";

  const initialLow = 7;
  const initialMedium = 12;
  const initialHigh = 16;
  const initialLowBias = 0.01;
  const initialMediumBias = 0.01;
  const initialHighBias = 0.01;
  const initialLowCenter = 10;
  const initialMediumCenter = 15;
  const initialHighCenter = 20;

  // Add bias state for each risk level
  const [lowRisk, setLowRisk] = useState<StockGraphParamater[]>([
    { value: 7, date: DateTime.now().toFormat(dateFormat) },
  ]);
  const [lowBias, setLowBias] = useState(0.01);

  const [mediumRisk, setMediumRisk] = useState<StockGraphParamater[]>(
    [{ value: 12, date: DateTime.now().toFormat(dateFormat) }]
  );
  const [mediumBias, setMediumBias] = useState(0.01);

  const [highRisk, setHighRisk] = useState<StockGraphParamater[]>([
    { value: 16, date: DateTime.now().toFormat(dateFormat) },
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

  React.useEffect(() => {
    if (crashFlag !== undefined) {
      setLowRisk((prev) => [
        ...prev.slice(0, -1),
        {
          value: initialLow,
          date: DateTime.now().toFormat(dateFormat),
        },
      ]);
      setMediumRisk((prev) => [
        ...prev.slice(0, -1),
        {
          value: initialMedium,
          date: DateTime.now().toFormat(dateFormat),
        },
      ]);
      setHighRisk((prev) => [
        ...prev.slice(0, -1),
        {
          value: initialHigh,
          date: DateTime.now().toFormat(dateFormat),
        },
      ]);
      setLowBias(initialLowBias);
      setMediumBias(initialMediumBias);
      setHighBias(initialHighBias);
      setLowCenter(initialLowCenter);
      setMediumCenter(initialMediumCenter);
      setHighCenter(initialHighCenter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crashFlag]);

  // Helper to apply multiplier, now takes bias as argument
  function getNextValueDynamic(
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
      setLowBias((prev) => Math.min(prev + 0.01, 0.217));
      setMediumBias((prev) => Math.min(prev + 0.01, 0.217));
      setHighBias((prev) => Math.min(prev + 0.01, 0.217));

      setLowRisk((prev) =>
        reduceGraph(
          [
            ...prev,
            {
              value: getNextValueDynamic(
                prev[prev.length - 1]?.value || 0,
                lowRiskPosMultiplier,
                lowRiskNegMultiplier,
                lowBias,
                lowCenter, // use state for center
                0.15
              ),
              date: DateTime.now().toFormat(dateFormat),
            },
          ],
          numIntervals
        )
      );
      setMediumRisk((prev) =>
        reduceGraph(
          [
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
              date: DateTime.now().toFormat(dateFormat),
            },
          ],
          numIntervals
        )
      );
      setHighRisk((prev) =>
        reduceGraph(
          [
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
              date: DateTime.now().toFormat(dateFormat),
            },
          ],
          numIntervals
        )
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [
    lowBias,
    mediumBias,
    highBias,
    lowCenter,
    mediumCenter,
    highCenter,
  ]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "24px",
        }}
      ></div>

      <div className="row boxedDark w100 p2 mb2 middle">
        <div className="row middle ml2">
          <img
            src="/Isaac-Drury-Young-1-1.jpg"
            alt="Drury Inc."
            className="mr2"
            style={{
              maxWidth: "160px",
              maxHeight: "160px",
              width: "100%",
              height: "auto",
              borderRadius: "var(--borderRadius)",
            }}
          />
          <div
            className="col textLeft RiskCard pr3 pl2"
            style={{ width: 250 }}
          >
            <h2 style={{ color: "var(--safeColor)" }}>Drury Inc.</h2>
            <p className="textLeft pt2 pb3">Low Risk</p>
            <h1 className="textLeft">
              ${lowRisk[lowRisk.length - 1]?.value.toFixed(0)}
            </h1>
          </div>
        </div>
        <div className="w100" style={{ height: "100%" }}>
          <StatusView data={lowRisk} color={"var(--safeColor)"} />
        </div>
      </div>

      <div className="row boxedDark w100 p2 mb2 middle">
        <div className="row middle pl2">
          <img
            src="/Duffman 1-1.jpg"
            alt="Drury Inc."
            className="mr2"
            style={{
              maxWidth: "160px",
              maxHeight: "160px",
              width: "100%",
              height: "auto",
              borderRadius: "var(--borderRadius)",
            }}
          />
          <div className="textLeft pl2" style={{ width: 250 }}>
            <h2 style={{ color: "var(--warningColor)" }}>
              Duffman Co.
            </h2>
            <p className="textLeft pt2 pb3">Medium Risk</p>
            <h1 className="textLeft">
              ${mediumRisk[mediumRisk.length - 1]?.value.toFixed(0)}
            </h1>
          </div>
        </div>
        <div className="w100" style={{ height: "100%" }}>
          <StatusView
            data={mediumRisk}
            color={"var(--warningColor)"}
          />
        </div>
      </div>

      <div className="row boxedDark w100 p2 mb2 middle">
        <div className="row middle pl2">
          <img
            src="/Mullet-Man-Lawrie-1-1.png"
            alt="Lawrie Coin"
            className="mr2"
            style={{
              maxWidth: "160px",
              maxHeight: "160px",
              width: "100%",
              height: "auto",
              borderRadius: "var(--borderRadius)",
            }}
          />
          <div
            className="RiskCard high pr3 pl2"
            style={{ width: 250 }}
          >
            <h2
              className="textLeft"
              style={{ color: "var(--dangerColor)" }}
            >
              Lawrie Coin
            </h2>
            <p className="textLeft pt2 pb3">High Risk</p>
            <h1 className="textLeft">
              ${highRisk[highRisk.length - 1]?.value.toFixed(0)}
            </h1>
          </div>
          <div
            className="col"
            style={{ display: "flex", justifyContent: "center" }}
          ></div>
        </div>
        <div className="w100 " style={{ height: "100%" }}>
          <StatusView data={highRisk} color={"var(--dangerColor)"} />
        </div>
      </div>
    </div>
  );
}

export default CalculationMultiplier;
